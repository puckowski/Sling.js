const COOKIE_NOTE_DATA = 'cookieNoteData';

class NoteService {

    constructor() {

    }

    getNoteCookie() {
        return this.getCookie(COOKIE_NOTE_DATA);
    }

    setNoteCookie(notes) {
        this.setCookie(COOKIE_NOTE_DATA, JSON.stringify(notes), 31);
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    getCookie(cname) {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
}

export default NoteService;
