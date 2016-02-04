function intersection(yCur, hCur, yMur, hMur, ok) {
	return ((yMur+hMur < yCur && yMur > yCur+hCur) || (yMur+hMur > yCur && hMur < yCur+hCur) && ok ==1);
}
