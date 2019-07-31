var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

function KMPSearch(pat, txt) {
    pat = pat.toUpperCase();
    txt = txt.toUpperCase();
    var n = txt.length;
    var m = pat.length;
    var lps = [];
    computeLPSArray(pat, lps);
    var i = 0;
    var j = 0;
    while (i < n) {
        if (txt[i] == pat[j]) {
            i++;
            j++;
        }
        if (j == m) {
            var index = i - j;
            j = lps[j - 1];
            return index;
        }
        else if (i < n && pat[j] != txt[i]) {
            if (j != 0) {
                j = lps[j - 1];
            }
            else {
                i++;
            }
        }
    }
    return -1;
}

function computeLPSArray(pat, lps) {
    var len = 0;
    lps[0] = 0;
    var i = 1;
    var m = pat.length;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else if (len != 0) {
            len = lps[len - 1];
        }
        else {
            lps[i] = 0;
            i++;
        }
    }
}

function inputChange(val) {
    var res = "";
    if (val.length >= 3) {
        var resCount = 0;
        for (var i = 0; i < country_list.length; ++i) {
            var index = KMPSearch(val, country_list[i]);
            if (index != -1) {
                var country = country_list[i];
                var word = "";
                if (index > 0) {
                    word += country.slice(0, index);
                }
                word += "<b>" + country.slice(index, index + val.length) + "</b>";
                if (index + val.length < country.length) {
                    word += country.slice(index + val.length, country.length);
                }
                res += "<div class='result'>" + word + "</div>";
                resCount++;
                if (resCount == 5) {
                    i = country_list.length + 10;
                }
            }
        }
    }
    document.getElementById("search-results").innerHTML = res;
}

function searchFunction(val) {
    var res = "";
    var resCount = 0;
    for (var i = 0; i < country_list.length; ++i) {
        var index = KMPSearch(val, country_list[i]);
        if (index != -1) {
            res += "\n" + country_list[i];
            resCount++;
        }
    }
    alert("Results: " + resCount + "\n" + res + "\n");
}