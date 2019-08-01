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