#!/bin/zsh
# slice.sh <png> <sliceHeight> <outWidth> : cut a tall screenshot into viewable parts
f=$1; h=${2:-1800}; w=${3:-1000}
H=$(sips -g pixelHeight $f | tail -1 | awk '{print $2}'); W=$(sips -g pixelWidth $f | tail -1 | awk '{print $2}')
out=shots/slices; mkdir -p $out; base=$(basename $f .png); i=0; y=0
while [ $y -lt $H ]; do
  ch=$h; [ $((y+h)) -gt $H ] && ch=$((H-y))
  sips -c $ch $W --cropOffset $y 0 $f --out $out/$base-$i.png >/dev/null 2>&1
  sips -Z $w $out/$base-$i.png >/dev/null 2>&1
  echo $out/$base-$i.png; i=$((i+1)); y=$((y+h))
done
