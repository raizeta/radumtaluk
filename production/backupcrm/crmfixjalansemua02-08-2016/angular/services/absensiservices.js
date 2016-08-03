'use strict';
myAppModule.factory('AbsensiService', ["$rootScope","$http","$q","$filter","$window","LocationService",
function($rootScope,$http, $q, $filter, $window,LocationService)
{
	var LocalStorageAbsensi;

    var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

    var getAbsensi = function(auth,tanggalplan)
    {
        var iduser = auth.id;
        var url = getUrl();
        var deferred = $q.defer();
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Pragma': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
            }
        };

        var linkurl =   url + "/salesmanabsensis/search?USER_ID="+ iduser + "&TGL=" + tanggalplan;
        $http({method:'GET', url:linkurl,config:config})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
                if($window.localStorage.removeItem('LocalStorageAbsensi'))
                {
                   $window.localStorage.removeItem('LocalStorageAbsensi'); 
                }
                deferred.resolve([]);
            }
            else if(angular.isDefined(response.Salesmanabsensi))
            {
                if(response.Salesmanabsensi[0].STATUS == 1)
                {
                    var AbsenKeluarResponse = 1;
                }
                else
                {
                    var AbsenKeluarResponse = 0;
                }
                
                LocalStorageAbsensi = 
                {
                    AbsenID     : response.Salesmanabsensi[0].ID,
                    AbsenUser   : response.Salesmanabsensi[0].USER_ID,
                    AbsenMasuk  : 1,
                    AbsenKeluar : AbsenKeluarResponse,
                    AbsenTanggal: response.Salesmanabsensi[0].TGL
                };
                var absensimasuk = JSON.stringify(LocalStorageAbsensi);
                $window.localStorage.setItem('LocalStorageAbsensi', absensimasuk);
                deferred.resolve(response.Salesmanabsensi[0]); 
            }
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        }); 

        return deferred.promise;
    }
    
    var setAbsensi = function(detail)
    {
        var url = getUrl();
        var deferred = $q.defer();

        var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "/salesmanabsensis",serialized,config)
        .success(function(data,status,headers,config) 
        {
            LocalStorageAbsensi = 
            {
                AbsenID     : data.ID,
                AbsenUser   : detail.USER_ID,
                AbsenMasuk  : 1,
                AbsenKeluar : 0,
                AbsenTanggal: detail.TGL
            };
            var absensimasuk = JSON.stringify(LocalStorageAbsensi);
            $window.localStorage.setItem('LocalStorageAbsensi', absensimasuk);
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
    var updateAbsensi = function(AbsenID,detail)
    {
        var url = getUrl();
        var deferred = $q.defer();

        var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url + "/salesmanabsensis/" + AbsenID,serialized,config)
        .success(function(data,status,headers,config) 
        {
            LocalStorageAbsensi = 
            {
                AbsenID     : AbsenID,
                AbsenUser   : data.USER_ID,
                AbsenMasuk  : 1,
                AbsenKeluar : 1,
                AbsenTanggal: data.TGL
            };
            var absensimasuk = JSON.stringify(LocalStorageAbsensi);
            $window.localStorage.setItem('LocalStorageAbsensi', absensimasuk);
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function getLocalStorageAbsensi() 
    {
        return LocalStorageAbsensi;
    }
    
    function init() 
    {
        if ($window.localStorage.getItem('LocalStorageAbsensi')) 
        {
            LocalStorageAbsensi = JSON.parse($window.localStorage.getItem('LocalStorageAbsensi'));
        }
    }
    init();
    
	return{
            getAbsensi:getAbsensi,
            setAbsensi:setAbsensi,
            updateAbsensi:updateAbsensi,
            getLocalStorageAbsensi:getLocalStorageAbsensi
		}
}]);