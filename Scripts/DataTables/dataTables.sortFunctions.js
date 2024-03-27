jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "spanish-string-asc": function (s1, s2) {
        return s1.localeCompare(s2);
    },

    "spanish-string-desc": function (s1, s2) {
        return s2.localeCompare(s1);
    },

    "materia-asc": function (s1, s2) {
        var m1 = s1.match(">(.*)</span>");
        var ss1 = m1[1].split('.');
        ss1[0] = "000" + ss1[0];
        ss1[1] = "000" + ss1[1];
        ss1[2] = "000" + ss1[2];
        var x1 = ss1[0].substr(ss1[0].length - 3);
        var x2 = ss1[1].substr(ss1[1].length - 3);
        var x3 = ss1[2].substr(ss1[2].length - 3);

        var m2 = s2.match(">(.*)</span>");
        var ss2 = m2[1].split('.');
        ss2[0] = "000" + ss2[0];
        ss2[1] = "000" + ss2[1];
        ss2[2] = "000" + ss2[2];
        var y1 = ss2[0].substr(ss2[0].length - 3);
        var y2 = ss2[1].substr(ss2[1].length - 3);
        var y3 = ss2[2].substr(ss2[2].length - 3);

        return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : (x2 > y2) ? 1 : (x3 < y3) ? -1 : (x3 > y3) ? 1 : 0)));
    },

    "materia-desc": function (s1, s2) {
        var m1 = s1.match(">(.*)</span>");
        var ss1 = m1[1].split('.');
        ss1[0] = "000" + ss1[0];
        ss1[1] = "000" + ss1[1];
        ss1[2] = "000" + ss1[2];
        var x1 = ss1[0].substr(ss1[0].length - 3);
        var x2 = ss1[1].substr(ss1[1].length - 3);
        var x3 = ss1[2].substr(ss1[2].length - 3);

        var m2 = s2.match(">(.*)</span>");
        var ss2 = m2[1].split('.');
        ss2[0] = "000" + ss2[0];
        ss2[1] = "000" + ss2[1];
        ss2[2] = "000" + ss2[2];
        var y1 = ss2[0].substr(ss2[0].length - 3);
        var y2 = ss2[1].substr(ss2[1].length - 3);
        var y3 = ss2[2].substr(ss2[2].length - 3);

        return ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : (x2 > y2) ? -1 : (x3 < y3) ? 1 : (x3 > y3) ? -1 : 0)));
    },

    "fecha-asc": function (s1, s2) {
        var ss1 = s1.split('/');
        var x1 = ss1[2];
        var x2 = ss1[1];
        var x3 = ss1[0];

        var ss2 = s2.split('/');
        var y1 = ss2[2];
        var y2 = ss2[1];
        var y3 = ss2[0];

        return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : (x2 > y2) ? 1 : (x3 < y3) ? -1 : (x3 > y3) ? 1 : 0)));
    },

    "fecha-desc": function (s1, s2) {
        var ss1 = s1.split('/');
        var x1 = ss1[2];
        var x2 = ss1[1];
        var x3 = ss1[0];

        var ss2 = s2.split('/');
        var y1 = ss2[2];
        var y2 = ss2[1];
        var y3 = ss2[0];

        return ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : (x2 > y2) ? -1 : (x3 < y3) ? 1 : (x3 > y3) ? -1 : 0)));
    },

    "orden-asc": function (s1, s2) {
        var ss1 = s1.split(' / ');
        var x1 = parseInt(ss1[0]);
        var x2 = parseInt(ss1[1]);
        var ss2 = s2.split(' / ');
        var y1 = parseInt(ss2[0]);
        var y2 = parseInt(ss2[1]);

        return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : (x2 > y2) ? 1 : 0)));
    },

    "orden-desc": function (s1, s2) {
        var ss1 = s1.split(' / ');
        var x1 = parseInt(ss1[0]);
        var x2 = parseInt(ss1[1]);
        var ss2 = s2.split(' / ');
        var y1 = parseInt(ss2[0]);
        var y2 = parseInt(ss2[1]);

        return ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : (x2 > y2) ? -1 : 0)));
    },

    "ordenL-asc": function (s1, s2) {
        var ss1 = s1.split(' / ');
        var tt1 = ss1[0].split(' - ');
        var x1 = parseInt(tt1[0]);
        var x2 = parseInt(tt1[1]);
        var x3 = parseInt(ss1[1]);

        var ss2 = s2.split(' / ');
        var tt2 = ss2[0].split(' - ');
        var y1 = parseInt(tt2[0]);
        var y2 = parseInt(tt2[1]);
        var y3 = parseInt(ss2[1]);

        return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : (x2 > y2) ? 1 : (x3 < y3) ? -1 : (x3 > y3) ? 1 : 0)));
    },

    "ordenL-desc": function (s1, s2) {
        var ss1 = s1.split(' / ');
        var tt1 = ss1[0].split(' - ');
        var x1 = parseInt(tt1[0]);
        var x2 = parseInt(tt1[1]);
        var x3 = parseInt(ss1[1]);

        var ss2 = s2.split(' / ');
        var tt2 = ss2[0].split(' - ');
        var y1 = parseInt(tt2[0]);
        var y2 = parseInt(tt2[1]);
        var y3 = parseInt(ss2[1]);

        return ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : (x2 > y2) ? -1 : (x3 < y3) ? 1 : (x3 > y3) ? -1 : 0)));
    }
});