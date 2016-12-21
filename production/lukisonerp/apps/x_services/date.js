angular.module('starter')
.service('DateService',function($window)
{
    //Menentukan Minggu Keberepakah Tanggal Yang Dimasukkan Hasilnya Di Antara Rentang 0-53 atau dari jumlah minggu dalam setahun
    var GetWeekOf = function(tanggal)
    {
        Date.prototype.getWeek = function () 
        {
            var target  = new Date(this.valueOf());
            var dayNr   = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() != 4) 
            {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        }

        var d       = new Date(tanggal);
        var result  = d.getWeek();
        return result;
    }

    var GetDayOf = function(tanggal)
    {
        var d       = new Date(tanggal);
        var result  = d.getDay();
        return result;
    }


   return {
            GetWeekOf:GetWeekOf,
            GetDayOf:GetDayOf
        }
});