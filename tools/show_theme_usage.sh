#!/bin/sh

# Find all SCSS files in the banners directory
find banners -name "*.scss" |\

# Extract the theme name from the SCSS files
xargs grep -oE 'src/themes/\w+' |\

# Discard "special" themes
grep -vE "UseOfFunds|Fijitiv" |\

# Format the output - remove path prefixes
sed -Ee 's!banners/([^/]+/[^/]+).*:src/themes/(.*)!\1 => \2!' |\

# Sort and count the theme references
sort |\
uniq -c |\

sed -Ee 's!^([0-9 ]+)(.*)$!\2\1!' |\

# Remove the path prefix (e.g. "desktop", "mobile", etc) from consecutive lines
awk -F'/' '{
    if (prev != $1) {
        print $0;
        prev = $1;
    } else {
        sub($1"/", "    ");
        print $0;
    }
}' 
