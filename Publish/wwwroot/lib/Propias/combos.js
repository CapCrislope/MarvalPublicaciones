﻿//Biblioteca para Utilizar los DropDownList con el componente de Selectize
//v13.0

//v13.0 - Se agrega la función focus y blur para poder llamar de afuera a un método luego del evento onfocus y onblur del combo.
//v12.0 - Se agregó la opción de create para basic combo.
//		- Se parametrizó el texto que se muestra al crear un nuevo item con el option: CreateName
//v11.0 - Se agregó tipos de filtro (ComboBy) y tipos de combo disponibles (ComboType)
//      - ComboBy: te permite enviar un enum al controlador, de manera de poder elegir entre distintos "tipos" de un mismo combo
//      -   Un ejemplo claro se encuentra en PortalWeb, Controlador de AreasPracticas, sección de Combos
//      -   Allí se puede encontrar un buen ejemplo de un mismo combo que solo cambia en la composición de sus Stored Procedures
//      - ComboType: combo type permite enviar un enum al controlador para seleccionar entre distintos tipos de combo (por ejemplo combo con Id entero o con Id string)
//      -   el diseño de la implementación del lado del servidor puede variar desde un switch hasta un Command pattern o un Diccionario. 
//      -   en el caso del diccionario, ComboType sería la Key. Aún no se implementó una opción para ComboType "Search", ya que este recibe distintos parámetros que los demas
//v10.0 - Se arregló un error con la opción de creación de items en el search combo 
//v9.0  - Se extendió el parametro "removeValue" para el search combo, que no estaba implementado
//v8.0  - Se reformuló el handle para crear items cuando el ID es un string en el search combo.
//      - Se agregó un callback para los search combos al momento que se setear valores en la carga
//      - Se agregó un parametro myclass para setear una clase CSS al combo cuando se renderiza
//      - Arreglo de varios errores
//v7.0  - Se quito el llamado al callback en el evento onchange, se dejo solo en el load del combo.
//v6.0  - Se módifico el método de búsqueda para que no diferencie acentos.
//v5.0  - Se reformuló el método para captura el keydown
//v4.0  - Se agrego la posibilidad para especificar un delimitador de items
//v3.0  - Se agrego la parametrización de la cantidad minima de caracteres que se pueden utilizar para realizar una búsqueda en el combo.
//v2.0  - Se agrega la función change para poder llamar de afuera a un método luego del evento onchange del combo.
//v1.0  - Primera Versión


//tipos de filtro para combos
var ComboBy = {
    Base: "Base"
};
//tipos de combo disponibles
var ComboType = {
    Basic: "Basic",
    BasicString: "BasicString"
};


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('Combo', ['jquery'], function ($) {
            return factory($, root);
        });

    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), global || root);
    } else {
        // Browser globals
        root.Combo = factory(root.jQuery, root);
    }

}(this, function ($, root) {
    var init = function (root) {

        var Combo = function (options) {
            this.parseOptions(options);
            this.init();
        };

        function ReplaceDiacritics(s) {
            var r = s.toLowerCase();
            r = r.replace(new RegExp(/[àáâãäå]/g), "a");
            r = r.replace(new RegExp(/[èéêë]/g), "e");
            r = r.replace(new RegExp(/[ìíîï]/g), "i");
            r = r.replace(new RegExp(/[òóôõö]/g), "o");
            r = r.replace(new RegExp(/[ùúûü]/g), "u");
            return r;
        };

        $.extend(Combo.prototype, {

            // === Opciones ===

            // Options defaults.
            options: {
                name: "",  //Nombre del identificador del combo
                view: "", //Nombre de la vista en la cual estará el combo
                cantItems: null, //Cantidad de items que tendra el combo, null para multiples items
                persist: false, //Si las opciones seleccionadas deben volver a aparecer en las opciones
                create: false, //Si permite cargar nuevas opciones por el usuario
                actionController: "", //Action para llenar el combo [q: se utiliza "search" como parametro para filtrar la búsqueda]
                actionControllerSelect: "", //Action para llenar y seleccionar los items especificados en "selectValue" [q: se utilizan id separados por coma]
                selectValue: null, //Valores para seleccionar el combo
                search: null, //Parametro de búsqueda
                search2: null, //Parametro 2 de búsqueda
                cascadeCombo: null, //Función para crear combo en cascada
                removeValue: null, //Valor para eliminar del combo
                disable: false, //Si el combo se muestra deshabilitado
                callback: null, //Función que se llama luego de la carga del combo
                change: null, //Función que se llama luego de onchange
                minCantSearchChar: 2, //Cantidad mínima de caracteres para realizar una búsqueda en el combo.
                delimiter: ',', //Delimitador entre items del combo
                myClass: '', //Setea una clase CSS para el combo
                placeHolder: '', //Place Holder del combo
                comboBy: ComboBy.Base, //define los datos que va a poseer el combo (Enum ComboBy)
                comboType: ComboType.Basic, //define el tipo de combo (Basic o BasicS)
                createName: 'Buscar', //Setea el texto que aparece para crear una nueva opción.
                //focus: null, //Función que se llama luego de onfocus
                //blur: null, //Función que se llama luego de onblur
            },

            init: function () {

                Selectize.define('enter_key', function (options) {
                    var self = this;

                    this.onKeyDown = (function (e) {
                        var original = self.onKeyDown;

                        return function (e) {

                            if (e.keyCode === 188) {
                                e.preventDefault();
                            } else {
                                return original.apply(this, arguments);
                            }

                        };
                    })();
                });

                return this;
            },

            // === Métodos ===

            createBasicCombo: function () {
                var opt = this.options;
                $("#pnl" + opt.name + opt.view).load(opt.actionController,
                    {
                        search: opt.search,
                        search2: opt.search2,
                        identif: 'ddl' + opt.name + opt.view,
                        by: opt.comboBy,
                        placeHolder: opt.placeHolder,
                        //type: opt.comboType
                    },
                    function (response, status, xhr) {
                        if (status == "success") {
                            //debugger;
                            var arrLikeNombres = [];
                            var $select = $('#ddl' + opt.name + opt.view).selectize({
                                plugins: ['remove_button', 'enter_key'],
                                create: opt.create,
                                maxItems: opt.cantItems,
                                //diacritics: true,
                                onChange: function (value) {
                                   
                                    var arr = [];
                                    var items = $select[0].selectize.items;

                                    var text = items.map(function (value) {
                                        return $select[0].selectize.options[value].text;
                                    }).join(opt.delimiter);

                                    var val = items.map(function (value) {
                                        if (!($.inArray(value, arrLikeNombres) >= 0))
                                            arr.push(value);
                                        return $select[0].selectize.options[value].value;
                                    }).join(opt.delimiter);

                                    if ($('#hSel' + opt.name))
                                        $('#hSel' + opt.name).val(text);
                                    //$('#h' + opt.name + opt.view).val(val);
                                    $('#h' + opt.name + opt.view).val(arr.join(opt.delimiter));
                                    $('#h' + opt.name + opt.view).valid();
                                    $('#h' + opt.name + opt.view + 'Like').val(arrLikeNombres);
                                    if (opt.cascadeCombo)
                                        opt.cascadeCombo();
                                    if (opt.change)
                                        opt.change();
                                    //scroll.start();
                                },
                                onOptionAdd: function (value, data) {
                                    if (isNaN(value) && opt.create)
                                        arrLikeNombres.push(value); //Agrego una opción personalizada para buscar
                                },
                                onOptionRemove: function (value) {
                                    var indice = $.inArray(value, arrLikeNombres);
                                    if (indice >= 0)
                                        arrLikeNombres.splice(indice, 1);
                                },
                                render: {
                                    option_create: function (data, escape) {
                                        return '<div class="create">' + opt.createName + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                                    }
                                }
                                //onFocus: function (value) {
                                //    scroll.stop();
                                //},
                                //onBlur: function (value, dest) {
                                //    scroll.start();
                                //}
                            });
                            //debugger;
                            $select[0].selectize.clear(true);
                            if (opt.removeValue)
                                $select[0].selectize.removeOption(opt.removeValue);
                            //Lista Vacia
                            if ($select[0].selectize.order == 0) {
                                $('#h' + opt.name + opt.view).val('');
                                if ($('#hSel' + opt.name))
                                    $('#hSel' + opt.name).val('');
                                if (opt.cascadeCombo)
                                    opt.cascadeCombo();
                            }
                            else {
                                if (opt.selectValue) {
                                    $select[0].selectize.setValue(opt.selectValue);
                                } else {
                                    $('#h' + opt.name + opt.view).val('');
                                    if (opt.cascadeCombo)
                                        opt.cascadeCombo();
                                }
                            }
                            if (opt.disable)
                                $select[0].selectize.disable();
                            if (opt.callback)
                                opt.callback();

                            if (opt.myClass != '') {
                                $(this).find(".selectize-control > .selectize-input").addClass(opt.myClass);
                            }
                        } else
                            CargarAlertas(opt.view);
                    }
                );
            },

            createSearchCombo: function () {
                var opt = this.options;
                var arrLikeAutores = [];

                var creation;
                if (opt.create)
                    creation = function (input, callback) {
                        arrLikeAutores.push(input); //Agrego una opción personalizada para buscar
                        callback({ 'Id': input, 'Descripcion': input });
                    };
                else
                    creation = false;

                var $select = $('#ddl' + opt.name + opt.view).selectize({
                    plugins: ['remove_button', 'enter_key'],
                    maxItems: opt.cantItems,
                    persist: false,
                    diacritics: true,
                    create: creation,
                    valueField: opt.valueField,
                    labelField: opt.labelField,
                    searchField: opt.labelField,
                    sortField: [{ field: opt.labelField, direction: 'asc' }, { field: '$score' }],
                    options: [],
                    onChange: function (value) {
                        debugger;
                        var arr = [];
                        if (value != null) {
                            if ($.isArray(value)) {
                                value.forEach(function (val) {
                                    if (!($.inArray(val, arrLikeAutores) >= 0)) //En arrLikeAutores estan las palabras a buscar coincidir con autores
                                        arr.push(val); //En arr pongo los id seleccionados de autores de la base 
                                });
                            } else
                                arr.push(value);
                        }

                        if ($('#hSel' + opt.name + opt.view)) {
                            //$select[0].selectize.options[value].text -> .text no lo toma :S
                            if (value != "") {
                                $('#hSel' + opt.name + opt.view).val($select[0].selectize.options[value].Descripcion);
                            }
                            else {
                                $('#hSel' + opt.name + opt.view).val(""); 
                            }
                        }
                          

                        $('#h' + opt.name + opt.view).val(arr.join(opt.delimiter));
                        $('#h' + opt.name + opt.view).valid();
                        $('#h' + opt.name + opt.view + 'Like').val(arrLikeAutores);

                        if (opt.change)
                            opt.change();
                    },
                    score: function (search) {
                        search = ReplaceDiacritics(search);
                        var score = this.getScoreFunction(search);
                        var select = this;
                        return function (item) {
                            if (search.length < opt.minCantSearchChar) {
                                select.loadedSearches = { "": true }; //permite lanzar el load con cada caracter buscado
                                if ($.inArray(item.Id.toString(), select.items) < 0) {
                                    select.removeOption(item.Id); //si hay menos de 3 caracteres elimino todo en la lista menos lo seleccionado
                                    return 0;
                                }
                            } else
                                return score(item);
                        };
                    },
                    load: function (query, callback) {
                        var select = this;
                        if (!query.length) return callback();
                        if (query.length >= opt.minCantSearchChar) { //Busca a partir de una palabra de 3 caracteres
                            $.ajax({
                                url: opt.actionController,
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    q: query
                                },
                                error: function (request, error) {
                                    callback();
                                },
                                success: function (res) {
                                    if (opt.removeValue)
                                        res.aaData = jQuery.grep(array, function (item, i) {
                                            return (item.Id != opt.removeValue);
                                        });

                                    callback(res.aaData);
                                }
                            });
                        } else {
                            callback();
                        }
                    },
                    onInitialize: function () {
                        var select = this;
                        if (opt.selectValue) {
                            select.load(function (callback) {
                                $.ajax({
                                    url: opt.actionControllerSelect,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {
                                        q: opt.selectValue.toString()
                                    },
                                    error: function (request, error) {
                                        callback();
                                    },
                                    success: function (res) {
                                        callback(res.aaData);
                                        select.setValue(opt.selectValue);
                                        $('#h' + opt.name + opt.view).val(opt.selectValue.toString());
                                        if (opt.callback)
                                            opt.callback();
                                    }
                                });
                            });
                        } else {
                            $('#h' + opt.name + opt.view).val('');
                        }
                        if (opt.disable)
                            select.disable();

                        if (opt.myClass != '') {
                            $(this).find(".selectize-control > .selectize-input").addClass(opt.myClass);
                        }
                    },
                    onOptionAdd: function (value, data) {
                        //if (isNaN(value) && opt.create)
                        //    arrLikeAutores.push(value); //Agrego una opción personalizada para buscar
                    },
                    onOptionRemove: function (value) {
                        var indice = $.inArray(value, arrLikeAutores);
                        if (indice >= 0)
                            arrLikeAutores.splice(indice, 1);
                    },
                    render: {
                        option_create: function (data, escape) {
                            return '<div class="create">' + opt.createName + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                        }
                    }
                });

                // onKeyDown = $select[0].selectize.onKeyDown.bind($select[0].selectize);
                // $select[0].selectize.onKeyDown = function (e) {
                // var result = onKeyDown(e)
                // if (e.keyCode == 188) {
                // return false;
                // }
                // return result
                // }.bind($select[0].selectize)
            },

            // Put all the options in the right places.
            parseOptions: function (options, moreOptions) {
                this.options = $.extend(true, {}, Combo.prototype.options);
                var optArray = [options, moreOptions], curOpts;
                for (var curIndex = 0; curIndex < optArray.length; curIndex++) {
                    curOpts = optArray[curIndex];
                    if (typeof curOpts === "undefined") {
                        break;
                    }
                    if (typeof curOpts !== 'object') {
                        this.options.text = curOpts;
                    } else {
                        for (var option in curOpts) {
                            this.options[option] = curOpts[option];
                        }
                    }
                }
            },
        });

        return Combo;
    };
    return init(root);
}));