#!/bin/sh
linesHigh=120
linesWarn=80

RED='\033[1;31m'
YELLOW='\033[1;33m'
NOCOLOR='\033[0m'

fname="/tmp/cloc.$$.csv"

cloc src/ --by-file --include-lang=TypeScript --csv | grep '^TypeScript' | grep -v '/__tests__/' > $fname
echo Overgrown files:
overgrown=$(awk -F ',' "\$5 > $linesHigh {print \$5 \"\\t\" \$2}" $fname)
echo -e "${RED}${overgrown}${NOCOLOR}"
echo
echo Growing files
growing=$(awk -F ',' "\$5 <= $linesHigh && \$5 > $linesWarn {print \$5 \"\\t\" \$2}" $fname)
echo -e "${YELLOW}${growing}${NOCOLOR}"
rm -f $fname
