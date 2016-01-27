/* http://www.kryogenix.org/code/browser/searchhi/ */
/* Modified 20021006 to fix query string parsing and add case insensitivity */
/* Modified 20070316 to stop highlighting inside nosearchhi nodes */
/* Modified 20090104 by Bruce Lawson to use html5 mark element rather than span http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-mark-element */
/* Modified 20110313 by Mike Robinson to ignore words shorter than 3 characters long */

/* This script is by Stuart Langridge licensed under MIT license http://www.kryogenix.org/code/browser/licence.html */

function highlightWord(node,word) {
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word);
		}
	}
	
	// And do this node itself
	if (node.nodeType == 3) { // text node
		tempNodeVal = node.nodeValue.toLowerCase();
		tempWordVal = word.toLowerCase();
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			// check if we're inside a "nosearchhi" zone
			checkn = pn;
			while (checkn.nodeType != 9 && 
			checkn.nodeName.toLowerCase() != 'body') { 
			// 9 = top of doc
				if (checkn.className.match(/\bnosearchhi\b/)) { return; }
				checkn = checkn.parentNode;
			}
			if (pn.className != "searchword") {
				// word has not already been highlighted!
				nv = node.nodeValue;
				ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				before = document.createTextNode(nv.substr(0,ni));
				docWordVal = nv.substr(ni,word.length);
				after = document.createTextNode(nv.substr(ni+word.length));
				hiwordtext = document.createTextNode(docWordVal);
				hiword = document.createElement("mark");
				hiword.className = "searchword";
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}
}

function googleSearchHighlight() {
	if (!document.createElement) return;
	ref = document.referrer;
	if (ref.indexOf('?') == -1) return;
	qs = ref.substr(ref.indexOf('?')+1);
	qsa = qs.split('&');
	for (i=0;i<qsa.length;i++) {
		qsip = qsa[i].split('=');
	        if (qsip.length == 1) continue;
        	if (qsip[0] == 'q' || qsip[0] == 'p') { // q= for Google, p= for Yahoo
			words = unescape(qsip[1].replace(/\+/g,' ')).split(/\s+/);
	                for (w=0;w<words.length;w++) {
	                  if (words[w].length < 4) continue;
				highlightWord(document.getElementsByTagName("body")[0],words[w]);
                	}
	        }
	}
}