function Sniffer(ua) {
    var sniff = {
            browser: {
                fullName: '',
                name: '',
                version: '',
                majorVersion: null,
                minorVersion: null,
                patchVersion: null,
                engine: ''
            },
            os: {
                fullName: '',
                name: '',
                version: '',
                versionName: '',
                versionAltNames: [],
                majorVersion: null,
                minorVersion: null,
                patchVersion: null
            },
            features: {
                bw: false,
                mobile: false,
                tv: false,
                proxy: false
            }
        },

        data = {
            browser: [
                // Sailfish
                {
                    test: ['SailfishBrowser'],
                    browser: {
                        fullName: 'Sailfish Browser',
                        name: 'sailfishbrowser',
                        engine: 'gecko',
                        $version: {
                            search: 'SailfishBrowser/'
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // IE
                {
                    test: ['MSIE'],
                    browser: {
                        fullName: 'Internet Explorer',
                        name: 'ie',
                        engine: 'trident',
                        $version: {
                            search: 'MSIE '
                        }
                    }
                },
                // IE 11+
                {
                    test: ['Trident'],
                    browser: {
                        fullName: 'Internet Explorer',
                        name: 'ie',
                        engine: 'trident',
                        $version: {
                            search: 'rv:'
                        }
                    }
                },
                // Opera 15+
                {
                    test: ['OPR/'],
                    browser: {
                        fullName: 'Opera',
                        name: 'opera',
                        engine: 'webkit',
                        $version: {
                            search: 'OPR/'
                        }
                    }
                },
                // Chrome
                {
                    test: ['Chrome'],
                    browser: {
                        fullName: 'Chrome',
                        name: 'chrome',
                        engine: 'webkit',
                        $version: {
                            search: 'Chrome/'
                        }
                    }
                },
                // Firefox
                {
                    test: ['Firefox'],
                    browser: {
                        fullName: 'Firefox',
                        name: 'firefox',
                        engine: 'gecko',
                        $version: {
                            search: 'Firefox/'
                        }
                    }
                },
                // Nokia Browser (not Nokia Xpress)
                {
                    test: ['NokiaBrowser'],
                    browser: {
                        fullName: 'Nokia Browser',
                        name: 'nokiabrowser',
                        engine: 'webkit',
                        $version: {
                            search: 'NokiaBrowser/'
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // Opera Mini Presto
                {
                    test: ['Opera Mini', 'Presto'],
                    browser: {
                        fullName: 'Opera Mini',
                        name: 'operamini',
                        engine: 'presto',
                        $version: {
                            search: 'Version/'
                        }
                    },
                    features: {
                        mobile: true,
                        proxy: true
                    }
                },
                // Opera Mini Webkit - future proof
                {
                    test: ['Opera Mini', 'WebKit'],
                    browser: {
                        fullName: 'Opera Mini',
                        name: 'operamini',
                        engine: 'webkit'
                    },
                    features: {
                        mobile: true,
                        proxy: true
                    }
                },
                // Opera
                {
                    test: ['Opera'],
                    browser: {
                        fullName: 'Opera',
                        name: 'opera',
                        engine: 'presto',
                        $version: {
                            search: 'Version/'
                        }
                    }
                },
                // Ovi Browser = Nokia Xpress
                {
                    test: ['OviBrowser'],
                    browser: {
                        fullName: 'Ovi Browser',
                        name: 'ovi',
                        engine: 'gecko',
                        $version: {
                            search: 'OviBrowser/'
                        }
                    },
                    features: {
                        mobile: true,
                        proxy: true
                    }
                },
                // iOS Chrome
                {
                    test: ['CriOS/'],
                    browser: {
                        fullName: 'Chrome',
                        name: 'chrome',
                        engine: 'webkit',
                        $version: {
                            search: 'CriOS/'
                        }
                    }
                },
                // Opera Coast
                {
                    test: ['Coast/'],
                    browser: {
                        fullName: 'Opera Coast',
                        name: 'coast',
                        engine: 'webkit',
                        $version: {
                            search: 'Coast/'
                        }
                    }
                },
                // Safari
                {
                    test: ['Safari', 'Version/', /(iPhone OS|Macintosh|Windows)/],
                    browser: {
                        fullName: 'Safari',
                        name: 'safari',
                        engine: 'webkit',
                        $version: {
                            search: 'Version/'
                        }
                    }
                },
                // some other webkit browser
                {
                    test: ['WebKit'],
                    browser: {
                        engine: 'webkit'
                    }
                },
                // some other gecko browser
                {
                    test: ['Gecko/'],
                    browser: {
                        engine: 'gecko'
                    }
                }
            ],
            os: [
                // Sailfish
                {
                    test: ['Sailfish'],
                    os: {
                        fullName: 'Sailfish OS',
                        name: 'sailfish'
                    },
                    features: {
                        mobile: true
                    }
                },
                // Windows Phone
                {
                    test: ['Windows Phone'],
                    os: {
                        fullName: 'Windows Phone',
                        name: 'winphone',
                        $version: {
                            search: 'Windows Phone '
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // Windows
                {
                    test: ['Windows'],
                    os: {
                        fullName: 'Windows',
                        name: 'win',
                        $version: {
                            search: 'Windows NT ',
                            names: {
                                '6.3': '8.1',
                                '6.2': '8',
                                '6.1': '7',
                                '6.0': 'Vista',
                                '5.2': 'XP',
                                '5.1': 'XP',
                                '5.01': '2000',
                                '5.0': '2000'
                            },
                            altNames: {
                                '5.2': ['Server 2003']
                            }
                        }
                    }
                },
                // Mac OS X
                {
                    test: ['Macintosh', 'OS X 10'],
                    os: {
                        fullName: 'Mac OS X',
                        name: 'osx',
                        $version: {
                            search: /OS X 10(_|\.)/,
                            prop: 'majorVersion',
                            names: {
                                '6': 'Snow Leopard',
                                '7': 'Lion',
                                '8': 'Mountain Lion',
                                '9': 'Mavericks',
                                '10': 'Yosemite'
                            }
                        }
                    }
                },
                // iOS
                {
                    test: ['iPhone'],
                    os: {
                        fullName: 'iOS',
                        name: 'ios',
                        $version: {
                            search: 'iPhone OS '
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // Kindle
                {
                    test: ['Kindle'],
                    os: {
                        fullName: 'Kindle',
                        name: 'kindle',
                        $version: {
                            search: 'Kindle/'
                        }
                    },
                    features: {
                        bw: true,
                        mobile: true
                    }
                },
                // Android
                {
                    test: ['Android'],
                    os: {
                        fullName: 'Android',
                        name: 'android',
                        $version: {
                            search: 'Android '
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // BlackBerry
                {
                    test: [/(BlackBerry|BB\d+)/],
                    os: {
                        fullName: 'BlackBerry',
                        name: 'blackberry',
                        $version: {
                            search: 'Version/'
                        }
                    },
                    features: {
                        mobile: true
                    }
                },
                // Symbian
                {
                    test: ['Symbian'],
                    os: {
                        fullName: 'Symbian',
                        name: 'symbian'
                    },
                    features: {
                        mobile: true
                    }
                },
                // Symbian
                {
                    test: ['Series40'],
                    os: {
                        fullName: 'Symbian',
                        name: 'symbian'
                    },
                    features: {
                        mobile: true
                    }
                },
                // PS Vita
                {
                    test: ['PlayStation Vita'],
                    os: {
                        fullName: 'PlayStation Vita',
                        name: 'psvita'
                    },
                    features: {
                        mobile: true
                    }
                },
                // Nintendo DSi
                {
                    test: ['Nintendo DSi'],
                    os: {
                        fullName: 'Nintendo DSi',
                        name: 'dsi'
                    },
                    features: {
                        mobile: true
                    }
                },
                // Nintendo 3DS
                {
                    test: ['Nintendo 3DS'],
                    os: {
                        fullName: 'Nintendo 3DS',
                        name: '3ds'
                    },
                    browser: {
                        engine: 'webkit'
                    },
                    features: {
                        mobile: true
                    }
                },
                // Viera smart tv
                {
                    test: ['Viera'],
                    os: {
                        fullName: 'Viera',
                        name: 'viera'
                    },
                    browser: {
                        engine: 'webkit'
                    },
                    features: {
                        tv: true
                    }
                },
                // Sony smart tv
                {
                    test: ['SonyDTV'],
                    features: {
                        tv: true
                    }
                }
            ],
            features: [
                {
                    test: [/mobile/i],
                    features: {
                        mobile: true
                    }
                },
                {
                    test: [/smart-{0,1}tv/i],
                    features: {
                        tv: true
                    }
                }
            ]
        };

    //return initial sniff state in case no ua string passed
    if (!ua) return sniff;

    function init() {
        for (var i in data) {
            test(data[i]);
        };
    }

    function test(obj) {
        for (var i=0; i<obj.length; i++) {
            var test = true;

            for (var j=0; j<obj[i].test.length; j++) {
                if (obj[i].test[j] instanceof RegExp) {
                    if (!obj[i].test[j].test(ua)) {
                        test = false;
                        break;
                    }
                }
                else {
                    if (ua.indexOf(obj[i].test[j]) == -1) {
                        test = false;
                        break;
                    }
                }
            }

            if (test) {
                apply(obj[i]);
                break;
            }
        }
    }

    function apply(obj) {
        for (var i in data) {
            if (data.hasOwnProperty(i) && obj[i]) {
                if (obj[i].$version) {
                    var version = getVersion(obj[i].$version.search);

                    if (version) {
                        var semverArr = version.split('.'),
                            versionNames = obj[i].$version.names,
                            versionAltNames = obj[i].$version.altNames;

                        obj[i].version = version;

                        if (semverArr[0]) obj[i].majorVersion = parseInt(semverArr[0]);
                        if (semverArr[1]) obj[i].minorVersion = parseInt(semverArr[1]);
                        if (semverArr[2]) obj[i].patchVersion = parseInt(semverArr[2]);

                        if (versionNames) {
                            var versionName,
                                versionNameArr = [];

                            for (var j = 0; j < semverArr.length; j++) {
                                versionNameArr.push(semverArr[j]);
                                versionName = versionNameArr.join('.');
                                if (versionNames[versionName]) {
                                    obj[i].versionName = versionNames[versionName];
                                }
                                if (versionAltNames && versionAltNames[versionName]) {
                                    obj[i].versionAltNames = versionAltNames[versionName];
                                }
                            }
                        }
                    }
                }

                for (var prop in obj[i]) {
                    if (obj[i].hasOwnProperty(prop) && prop[0] !== '$') sniff[i][prop] = obj[i][prop];
                }
            }
        }
    }

    function getVersion(search) {
        var searchString;

        if (search instanceof RegExp) {
            searchString = (ua.match(search) || [])[0];

            if (!searchString) return;
        }
        else {
            searchString = search;
        }

        var index = ua.indexOf(searchString),
            substring;

        if (index == -1) return;

        substring = ua.substring(index+searchString.length);
        regexpResult = /^(\d+(\.|_)){0,2}\d+/.exec(substring);

        if (!regexpResult) return;

        return regexpResult[0].replace(/_/g, '.');
    }

    init();

    return sniff;
}
