#!/bin/sh
fname="/tmp/cloc.$$.csv"
cloc src/ --by-file --include-lang=TypeScript --csv | grep '^TypeScript' > $fname
echo Overgrown files:
awk -F ',' '$5 > 120 {print $5 "\t" $2}' $fname
echo
echo Growing files
awk -F ',' '$5 <= 120 && $5 > 80 {print $5 "\t" $2}' $fname
rm -f $fname
