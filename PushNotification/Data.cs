using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PushNotification
{
    public class Data
    {

        CultureInfo culture = new CultureInfo("pt-BR");
        
        
        public string data { get; set;  }

        public string DataPorExtenso(DateTime data)
        {
            DateTimeFormatInfo dtfi = culture.DateTimeFormat;

            int dia = data.Day;
            int ano = data.Year;
            string mes = culture.TextInfo.ToTitleCase(dtfi.GetMonthName(data.Month));
            string diasemana = culture.TextInfo.ToTitleCase(dtfi.GetDayName(data.DayOfWeek));
            string hora = data.ToString("hh:mm:ss tt");

            return diasemana + ", " + dia + " de " + mes + " de " + ano + " as " + hora;
            
        }

    }

}