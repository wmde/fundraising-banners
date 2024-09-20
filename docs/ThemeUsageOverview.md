# How to get an overview which banner uses which theme

You can use the shell script `show_theme_usage.sh` used to get an overview which banner uses which theme(s). It filters the `UseOfFunds` and `Fijitiv` themes, because the `UseOfFunds` is used in all banners and the `Fijitiv` theme is only for the desktop fallback banner that we display when the regular banner does not fit the screen.

The output shows the banner name and the theme(s) used in the banner. The count at the end of the line shows how many files from the theme are included in the banner. For Banners that have two style files, the count will be inaccurate (i.e twice as high), because most themes files are included in both styles.

Ideally, each banner should use only one theme. If a banner uses more than one theme, please have a look and adjust the banner. The Desktop banners up until 04 accidentally use some variables from the `Treedip` theme even when their main theme is `Svingle`.
