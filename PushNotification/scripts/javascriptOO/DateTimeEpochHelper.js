class DateTimeEpochHelper {

	constructor(dateVal, idioma) {
		this._dateVal = dateVal;
		this._idioma = idioma;
		this._current;
		this._previous;
		this._time;
		this._fulldate;

	}

	_timeDifference() {

		let msPerMinute = 60 * 1000;
		let msPerHour = msPerMinute * 60;
		let msPerDay = msPerHour * 24;
		let msPerMonth = msPerDay * 30;
		let msPerYear = msPerDay * 365;
		let retornoData = "";

		let elapsed = this._current - this._previous;

		if (elapsed < msPerMinute) {

			switch (this._idioma) {
				case 2:
				retornoData = "a few seconds ago";
				break;
				case 3:
				retornoData = "hace unos segundos";
				break;
				default:
				retornoData = "alguns segundos atr&aacute;s";
				break;
			}

			return retornoData;
		}

		else if (elapsed < msPerHour) {
			if (Math.round(elapsed / msPerMinute) == 60)
			{
				switch (this._idioma) {
					case 2:
					retornoData = "1 hour ago"
					break;
					case 3:
					retornoData = "Hace 1 hora"
					break;
					default:
					retornoData = "H&aacute; 1 hora"
					break;
				}
				return retornoData;

			}
			else if (Math.round(elapsed / msPerMinute) < 2)
			{
				switch (this._idioma) {
					case 2:
					retornoData = "About a minute ago"
					break;
					case 3:
					retornoData = "Hace um minuto aproximadamente"
					break;
					default:
					retornoData = "H&aacute; aproximadamente um minuto"
					break;
				}
				return retornoData;

			}
			else
			{
				switch (this._idioma) {
					case 2:
					retornoData = Math.round(elapsed / msPerMinute) + ' minutes ago ';
					break;
					case 3:
					retornoData = 'Hace ' + Math.round(elapsed / msPerMinute) + ' minutos ';
					break;
					default:
					retornoData = 'H&aacute; ' + Math.round(elapsed / msPerMinute) + ' minutos ';
					break;
				}

				return retornoData;

			}
		}

		else if (elapsed < msPerDay) {

			if (Math.round(elapsed / msPerHour) == 24)
			{

				switch (this._idioma) {
					case 2:
					retornoData = 'Yesterday at ' + this._time;
					break;
					case 3:
					retornoData = 'Ayer ' + this._time;
					break;
					default:
					retornoData = 'Ontem &agrave;s ' + this._time;
					break;
				}
				return retornoData;

			}
			else
			{

				switch (this._idioma) {
					case 2:
					retornoData = Math.round(elapsed / msPerHour) + ' hours ago';
					break;
					case 3:
					retornoData = 'Hace ' + Math.round(elapsed / msPerHour) + ' horas';
					break;
					default:
					retornoData = 'H&aacute; ' + Math.round(elapsed / msPerHour) + ' horas';
					break;
				}

				return retornoData;

			}
		}

		else if (elapsed < msPerMonth) {
			if (Math.round(elapsed / msPerDay) == 1)
			{
				switch (idioma) {
					case 2:
					retornoData = 'Yesterday at ' + this._time;
					break;
					case 3:
					retornoData = 'Ayer ' + this._time;
					break;
					default:
					retornoData = 'Ontem &agrave;s ' + this._time;
					break;
				}
				return retornoData;
			}
			else
			{
				return this._fulldate;
			}
		}
		else if (elapsed < msPerYear) {
			return this._fulldate; //'Ha ' + Math.round(elapsed / msPerMonth) + ' meses ';
		}
		else 
		{
			return this._fulldate; //'Ha ' + Math.round(elapsed / msPerYear) + ' anos';
		}
	}

	exibe() {
		
		switch (this._idioma) {
			case 2:
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			break;
			case 3:
			var monthNames = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
			break;
			default:
			var monthNames = ["janeiro", "fevereiro", "mar&ccedil;o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
			break;
		}
		
		this._previous = new Date(parseFloat(this._dateVal.substr(6)));
		this._current = new Date();
		this._time = (((this._previous.getHours() < 10 ? '0' : '') + this._previous.getHours()) + ":" + (this._previous.getMinutes() < 10 ? '0' : '') + this._previous.getMinutes());

		switch (this._idioma) {
			case 2:
				var hours = this._previous.getHours() > 12 ? this._previous.getHours() - 12 : this._previous.getHours();
				var am_pm = this._previous.getHours() >= 12 ? "PM" : "AM";
				hours = hours < 10 ? "0" + hours : hours;
				var minutes = this._previous.getMinutes() < 10 ? "0" + this._previous.getMinutes() : this._previous.getMinutes();
				var seconds = this._previous.getSeconds() < 10 ? "0" + this._previous.getSeconds() : this._previous.getSeconds();
				this._time = hours + ":" + minutes + " " + am_pm;

				this._fulldate = (monthNames[(this._previous.getMonth())] + " " + this._previous.getDate() + " at " + this._time);
			break
			case 3:
				this._fulldate  = (this._previous.getDate() + " de " + monthNames[(this._previous.getMonth())] + " a las " + ((this._previous.getHours() < 10 ? '0' : '') + this._previous.getHours()) + ":" + (this._previous.getMinutes() < 10 ? '0' : '') + this._previous.getMinutes());
			break;
			default:
				this._fulldate  = (this._previous.getDate() + " de " + monthNames[(this._previous.getMonth())] + " &agrave;s " + ((this._previous.getHours() < 10 ? '0' : '') + this._previous.getHours()) + ":" + (this._previous.getMinutes() < 10 ? '0' : '') + this._previous.getMinutes());
			break;
		}
		
		return this._timeDifference();
	}

}