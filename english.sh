cd translations/en
OUTPUT=`grep -rl 'English description not available' .`
echo "$OUTPUT"
echo "$OUTPUT" | wc -l
