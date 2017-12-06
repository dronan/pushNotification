class NotificationCountHelper {

	constructor() {
		this._titulo = document.title;
        this._count = parseInt(document.querySelector('span.count').textContent) || 0;
	}

	set count(count) {
		this._count = count;
		this.atualizaTotal();
	}

	subtraiCount() {
		this._count--;
	}


	atualizaTotal() { // updateNotificationCount
	    if (this._count > 0) {
	        $('.count').addClass("noti-bagde");
	        $('span.count').html(this._count);
	        document.title = '('+this._count+') ' + this._titulo;
	    } else {
	        $('.count').removeClass("noti-bagde");
	        $('span.count').html('&nbsp;');
	        var guardatitulo = this._titulo.indexOf(")") + 1;
	        if (guardatitulo >= 0) {
	            var newTitulo = this._titulo.substring(guardatitulo, this._titulo.length);
	            document.title = newTitulo;
	        }
	    }
	    
	}

}