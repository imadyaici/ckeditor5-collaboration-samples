(function(d){	const l = d['pl'] = d['pl'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 z %1","Align center":"Wyrównaj do środka","Align left":"Wyrównaj do lewej","Align right":"Wyrównaj do prawej",Anonymous:"Anonimowy",Aquamarine:"Akwamaryna","Are you sure?":"Jesteś pewny/pewna?",Big:"Duży",Black:"Czarny","Block quote":"Cytat blokowy",Blue:"Niebieski",Bold:"Pogrubienie","Bulleted List":"Lista wypunktowana",Cancel:"Anuluj","Choose heading":"Wybierz nagłówek",Column:"Kolumna",Comment:"Skomentuj","Comment editor":"Edytor komentarza",Default:"Domyślny","Delete column":"Usuń kolumnę","Delete comment thread?":"Usunąć wątek komentarzy?","Delete comment?":"Usunąć komentarz?","Delete row":"Usuń wiersz","Dim grey":"Ciemnoszary",Downloadable:"Do pobrania","Dropdown toolbar":"Rozwijany pasek narzędzi",Edit:"Edytuj","Edit block":"Edytuj blok","Edit link":"Edytuj odnośnik","Editor toolbar":"Pasek narzędzi edytora","Font Family":"Czcionka","Font Size":"Rozmiar czcionki",Green:"Zielony",Grey:"Szary","Header column":"Kolumna nagłówka","Header row":"Wiersz nagłówka",Heading:"Nagłówek","Heading 1":"Nagłówek 1","Heading 2":"Nagłówek 2","Heading 3":"Nagłówek 3","Heading 4":"Nagłówek 4","Heading 5":"Nagłówek 5","Heading 6":"Nagłówek 6",Huge:"Bardzo duży","Insert column left":"Wstaw kolumnę z lewej","Insert column right":"Wstaw kolumnę z prawej","Insert paragraph after block":"Wstaw akapit po bloku","Insert paragraph before block":"Wstaw akapit przed blokiem","Insert row above":"Wstaw wiersz ponad","Insert row below":"Wstaw wiersz poniżej","Insert table":"Wstaw tabelę",Italic:"Kursywa",Justify:"Wyrównaj obustronnie","Light blue":"Jasnoniebieski","Light green":"Jasnozielony","Light grey":"Jasnoszary",Link:"Wstaw odnośnik","Link URL":"Adres URL","Merge cell down":"Scal komórkę w dół","Merge cell left":"Scal komórkę w lewo","Merge cell right":"Scal komórkę w prawo","Merge cell up":"Scal komórkę w górę","Merge cells":"Scal komórki",Next:"Następny",No:"Nie",NUMBER_OF_COMMENTS:["%0 Komentarz","%0 Komentarze","%0 Komentarzy","%0 Komentarza"],"Numbered List":"Lista numerowana","Open in a new tab":"Otwórz w nowej zakładce","Open link in new tab":"Otwórz odnośnik w nowej zakładce",Orange:"Pomarańczowy",Paragraph:"Akapit",PENDING_ACTION_COMMENT_THREAD:"Niezapisana zmiana w wątku komentarzy.",Previous:"Poprzedni",Purple:"Purpurowy",Red:"Czerwony",Redo:"Ponów",Remove:"Usuń","Reply...":"Odpowiedz...","Rich Text Editor":"Edytor tekstu sformatowanego","Rich Text Editor, %0":"Edytor tekstu sformatowanego, %0",Row:"Wiersz",Save:"Zapisz","Select all":"Zaznacz wszystko","Select column":"Zaznacz kolumnę","Select row":"Zaznacz wiersz","Show more items":"Pokaż więcej",Small:"Mały","Split cell horizontally":"Podziel komórkę poziomo","Split cell vertically":"Podziel komórkę pionowo",Submit:"Zatwierdź","Table toolbar":"Pasek narzędzi tabel","Text alignment":"Wyrównanie tekstu","Text alignment toolbar":"Pasek narzędzi wyrównania tekstu","This link has no URL":"Nie podano adresu URL odnośnika",Tiny:"Bardzo mały",TOO_LONG_COMMENT_ALERT:"Komentarz jest zbyt długi. Twój komentarz ma %0 znaków. Dopuszczalny limit to %1 znaków.\"",Turquoise:"Turkusowy",Underline:"Podkreślenie",Undo:"Cofnij",Unlink:"Usuń odnośnik",White:"Biały","Widget toolbar":"Pasek widgetów","Write a comment...":"Napisz komentarz...",Yellow:"Żółty",Yes:"Tak"}	);l.getPluralForm=function(n){return (n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));