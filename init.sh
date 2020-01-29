IFS=$'\n'




# for file in $(find ./input -type f -name "*.swf");


# do
# echo "processing file : $file";

# ./jpexs/ffdec.bat -format sprite:svg -zoom 2 -export sprite "./output"   "$file"

# node ./combine_svgs.js "$file"


# done;



for file in $(find ./input -type f -name "*.svg");


do
echo "processing file : $file";

node svgo.js "$file";

done;