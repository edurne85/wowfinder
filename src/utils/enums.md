# Avoid manual name duplication for string-based enums

## Visual Studio code:

1. Define the enum with keys only
1. Do a regex-based search & replace with these options
    - Search: `(\w+),`
    - Replace `$1 = '$1',`
