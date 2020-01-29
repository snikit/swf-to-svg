IFS=$'\n'




for file in $(find ./input -type f -name "*.swf");


do
echo "processing file : $file";

./jpexs/ffdec.bat -zoom 2 -export shape "../output"   "$file"


#node swf.js "$file";

done;
