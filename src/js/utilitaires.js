function intersection(y1, h1, y2, h2, ok) {
	return ((y2+h2 < y1 && y2 > y1+h1) || (y2+h2 > y1 && h2 < y1+h1) && ok ==1);
}

function dansPorte(x1, w1, x2, w2) {
	return ((x1 + w1 >= x2 && x1 + w1 <= x2+w2));
}