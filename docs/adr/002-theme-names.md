# Theme names

2023-02-05

## Status

Accepted

## Context

A "theme" for a banner groups all the styling (colors, fonts, margins, etc) related to each
component in files named after the components. The theme (and its corresponding folder) needs to
have a name.

We came up with a list of must-have requirements for theme names:

- everyone should be able to come up with a new theme name
- the name should be short
- the name should be to write and pronounce
- the list of names should be consistent (i.e. follow the same pattern or
	come from the same category of things).
- should be "neutral", with no positive or negative association
  - no brand names
  - No given names / Character names?
- no cultural knowledge needed to understand them

In our original discussion we had other requirements, that we dropped (or
at least relegated to "nice to have"):

- descriptive names: Have drawbacks that contradict other requirements:
  - Can become long, because we need to add colors/properties.
  - When choosing real objects as names (e.g. flowers
	or character names) it might become harder and harder to choose names
	for similar-looking designs.
  - Require some world/cultural knowledge
- Using the names outside of the dev team: Probably won't happen.

Our experience from past campaigns shows that we need about 5-10 theme
names (i.e. different designs) per campaign.

### Option A: Random pronounceable names

Generate names from overlapping 3-character chunks which have a distribution
pattern that follows the English language.

Example theme names:

- `waubble`
- `duotent`
- `voggemi`
- `ihequet`
- `ekawsin`
- `migedle`
- `pinglyc`
- `yoketin`

Example imports:

```scss
@use '~theme/waubble/Icons/CloseIcon'
@use '~theme/waubble/DonationForm/DonationForm'
@use '~theme/waubble/DonationForm/SelectGroup'
@use '~theme/waubble/Footer/Footer'
@use '~theme/waubble/Footer/SelectionInput'
```

### Option B: Alliterated Animals

Generated names from a list of adjectives and choose from another list of
animal names that start with the first letter of the chosen adjective.

Example theme names:

`innocent-insect`
`staunch-squirrel`
`naive-nightingale`
`conservative-caterpillar`
`accommodating-alligator`
`euphoric-elephant`
`gifted-gerbil`
`zealot-zebu`

Example imports:

```scss
@use '~theme/accomodating-alligator/Icons/CloseIcon'
@use '~theme/accomodating-alligator/DonationForm/DonationForm'
@use '~theme/accomodating-alligator/DonationForm/SelectGroup'
@use '~theme/accomodating-alligator/Footer/Footer'
@use '~theme/accomodating-alligator/Footer/SelectionInput'
```

With the current list of adjectives and animals, we have a theoretical
number of combinations of 5349. If we want to have *unique* combinations
(no adjective or animal name reused), we have 694 combinations

## Decision

We decided to create a pre-generated list of names that all devs agree on.
When creating a new theme, strike the name from the list. If we generate a
list of about 100 names, it should last us for about 10 years.

For themes that are identical but are adapted for different channels
(desktop/mobile) we will use a suffix, e.g. `_desktop` or `_mobile`.

We chose the random pronounceable names because they are shorter. This is
our sorted list of names:

```
abiessy
afremic
agnanis
agneyen
ahantsa
alwarep
alwashe
amoddic
amyster
anionsl
anothen
arlyper
atlyway
aubleme
auttedi
azeingo
befulks
beyedde
bialogy
bildian
birriar
bjetick
brourie
caklanu
caloven
calvera
cefertu
creffer
cutlemi
dahamin
dicatio
dicaudi
dimalse
dinsete
duallec
ecidamb
edledud
edrestr
edualps
ehundwa
ementer
emyrogg
enueseq
erhadar
ericull
escatti
fedipti
fijitif
flastri
fonecto
fujimil
fuzzymo
gadepse
gedford
gedirch
gedshil
ghortie
gialeti
gnastor
goarnet
goddsol
gottecu
goweatt
hablusi
hemated
hestear
hewingi
hewspac
huagent
ialleco
iamerin
ichitud
icyclet
iegment
ificani
igancen
igingla
ikeredi
inhamin
iossien
isentio
ixtride
izooloc
jeallut
kintesc
ledscra
logymou
lotedia
luattex
lukruck
medipan
messell
mestain
mibills
miewarc
mikings
moberse
murkerm
myantin
nalanal
nikinsc
nocesit
nukeybo
nymeste
odamenu
ofecara
ollianc
oofinsi
oosispe
orecket
osildli
othoute
oucatie
oukeeny
owerthe
pultatt
putecub
pyrinis
rablool
riessib
rospica
royings
rudityl
rylepac
scrieck
seclied
seduala
sescial
seyntal
sificia
sirotho
sivoyen
snovies
squalso
squenti
stobsen
svingle
tipseed
tocoloo
todowne
tomptow
treedip
trondsh
tructon
tughlen
tyhonan
typowsh
ubatige
uctiver
udatere
uffinic
ugalles
uiparem
umontab
undesto
unustin
uraphot
urfusti
urucest
vircuti
vulents
worketi
xelymay
xicalme
xualtoo
yestypt
yperala
yrsalun
ytheles
zeating
zenteds
zerylov
```

