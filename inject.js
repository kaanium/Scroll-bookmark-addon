var ss = document.createElement("script");
ss.setAttribute("id", "scroll_bookmark");
ss.innerHTML= "addEventListener('scroll', function(){ \
   if (localStorage.exclude_link == 0 || localStorage.exclude_link === undefined){ \
   if (localStorage.list !== undefined) \
   var b = JSON.parse(localStorage.list); \
   else var b = ''; \
   var aralik = [{'scroll': document.scrollingElement.scrollTop, \
				        'link': window.location.href }]; \
	if (b === '') b = aralik; else { \
	for (var i = 0; i < b.length; i++){ \
	if (b[i].link == aralik[0].link){ \
	b[i] = aralik[0]; break; }\
	else if (i == b.length - 1) \
	b.push(aralik[0]); }}\
   localStorage.list = JSON.stringify(b);} \
});";
document.documentElement.appendChild(ss);