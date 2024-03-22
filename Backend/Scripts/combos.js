//Biblioteca para Utilizar los DropDownList con el componente de Selectize
//v5.0

//v5.0 - Se reformuló el método para captura el keydown
//v4.0 - Se agrego la posibilidad para especificar un delimitador de items
//v3.0 - Se agrego la parametrización de la cantidad minima de caracteres que se pueden utilizar para realizar una búsqueda en el combo.
//v2.0 - Se agrega la función change para poder llamar de afuera a un método luego del evento onchange del combo.
//v1.0 - Primera Versión

(function (root, factory) {
    
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('Combo', ['jquery'], function($){
            return factory($, root);
        });

    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), global || root);
    } else {
        // Browser globals
        root.Combo = factory(root.jQuery, root);
    }

}(this, function($, root){
    var init = function (root) {

        var Combo = function (options) {
            this.parseOptions(options);
            this.init();
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
                cascadeCombo: null, //Función para crear combo en cascada
                removeValue: null, //Valor para eliminar del combo
                disable: false, //Si el combo se muestra deshabilitado
                callback: null, //Función que se llama luego de la carga del combo
                change: null, //Función que se llama luego de onchange
                minCantSearchChar: 3, //Cantidad mínima de caracteres para realizar una búsqueda en el combo.
                delimiter: ',' //Delimitador entre items del combo
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
                ;
                $("#pnl" + opt.name + opt.view).load(opt.actionController, { search: opt.search, identif: 'ddl' + opt.name + opt.view }, function (response, status, xhr) {
                    if (status == "success") {
                        var arrLikeNombres = [];
                        var $select = $('#ddl' + opt.name + opt.view).selectize({
                            plugins: ['remove_button', 'enter_key', 'drag_drop'],
                            create: opt.create,
                            maxItems: opt.cantItems,
                            onChange: function (value) {
                                ;
                                var arr = [];
                                var items = $select[0].selectize.items;
                                var text = items.map(function (value) {
                                    if (!($.inArray(value, arrLikeNombres) >= 0))
                                        arr.push(value);
                                    return $select[0].selectize.options[value].text;
                                }).join(opt.delimiter);

                                if ($('#hSel' + opt.name))
                                    $('#hSel' + opt.name).val(text);
                                //$('#h' + opt.name + opt.view).val(value);
                                $('#h' + opt.name + opt.view).val(arr.join(opt.delimiter));
                                $('#h' + opt.name + opt.view).valid();
                                $('#h' + opt.name + opt.view + 'Like').val(arrLikeNombres);
                                if (opt.cascadeCombo)
                                    opt.cascadeCombo();
                                if (opt.change)
                                    opt.change();
                                if (opt.callback)
                                    opt.callback();
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
                                    return '<div class="create">Crear <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                                }
                            }
                        });

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
                    } else {
                        CargarAlertas(opt.view);
                    }
                });
            },

            createSearchCombo: function () {
                var opt = this.options;
                var arrLikeAutores = [];
                var $select = $('#ddl' + opt.name + opt.view).selectize({
                    plugins: ['remove_button', 'enter_key'],
                    maxItems: opt.cantItems,
                    persist: false,
                    create: opt.create,
                    valueField: opt.valueField,
                    labelField: opt.labelField,
                    searchField: opt.labelField,
                    sortField: [{ field: opt.labelField, direction: 'asc' }, { field: '$score' }],
                    options: [],
                    onChange: function (value) {
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

                        $('#h' + opt.name + opt.view).val(arr.join(opt.delimiter));
                        $('#h' + opt.name + opt.view).valid();
                        $('#h' + opt.name + opt.view + 'Like').val(arrLikeAutores);

                        if (opt.change)
                            opt.change();
                    },
                    score: function (search) {
                        var score = this.getScoreFunction(search);
                        var select = this;
                        return function (item) {
                            if (search.length < opt.minCantSearchChar) {
                                select.loadedSearches = { "": true }; //permite lanzar el load con cada caracter buscado
                                if ($.inArray(item.Id.toString(), select.items) < 0) {
                                    select.removeOption(item.Id); //si hay menos de 3 caracteres elimino todo en la lista menos lo seleccionado
                                    return 0;
                                }
                            }else
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
                                    }
                                });
                            });
                        } else {
                            $('#h' + opt.name + opt.view).val('');
                        }
                        if (opt.disable)
                            select.disable();
                    },
                    onOptionAdd: function (value, data) {
                        if (isNaN(value) && opt.create)
                            arrLikeAutores.push(value); //Agrego una opción personalizada para buscar
                    },
                    onOptionRemove: function (value) {
                        var indice = $.inArray(value, arrLikeAutores);
                        if (indice >= 0)
                            arrLikeAutores.splice(indice, 1);
                    },
                    render: {
                        option_create: function (data, escape) {
                            return '<div class="create">Buscar <strong>' + escape(data.input) + '</strong>&hellip;</div>';
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
            parseOptions: function(options, moreOptions){
                this.options = $.extend(true, {}, Combo.prototype.options);
                var optArray = [options, moreOptions], curOpts;
                for (var curIndex=0; curIndex < optArray.length; curIndex++) {
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