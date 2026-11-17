#!/usr/bin/env python3
"""Build the CC BY-SA 4.0 HYG 4.1 subset and truthful local finding-chart illustrations.
Usage: python3 scripts/prepare-stars.py /path/to/hygdata_v41.csv
The full development-only catalogue is never shipped to visitors.
"""
import csv, json, sys, hashlib, math
from pathlib import Path
source=Path(sys.argv[1]); rows=list(csv.DictReader(source.open()))
chosen=[r for r in rows if r['id']!='0' and float(r['mag'])<=3.5]
convert=lambda r:dict(id=int(r['id']),hip=int(r['hip']) if r['hip'] else None,name=r['proper'],designation=r['bf'],ra=float(r['ra']),dec=float(r['dec']),magnitude=float(r['mag']),spectral=r['spect'],colorIndex=float(r['ci']) if r['ci'] else None,distance=round(float(r['dist'])*3.26156,3) if 0<float(r['dist'])<100000 else None,constellation=r['con'])
stars=[convert(r) for r in chosen]
# HYG's Capella M1 composite entry is superseded for the bright giant pair (Torres et al. 2009).
for s in stars:
 if s['name']=='Capella': s['spectral']='G8III + G0III'
Path('data/stars.ts').write_text('// Generated HYG 4.1 subset; CC BY-SA 4.0. See docs/star-data-sources.md.\nimport type { Star } from "@/lib/astronomy/sky";\nexport const stars: readonly Star[] = '+json.dumps(stars,separators=(',',':'))+';\n')
features={
'Alpheratz':('Alpha Andromedae','Andromeda','A blue-white star in Andromeda, catalogued with a chemically peculiar B-type spectrum. Its visual magnitude is about 2, making it one of the brighter entries in this panorama.'),
'Diphda':('Beta Ceti','Cetus','Diphda is a K-type giant in Cetus. Its orange-toned light reflects a cooler surface than that of the blue-white B-type stars.'),
'Achernar':('Alpha Eridani','Eridanus','Achernar is a hot B-type star far south of the celestial equator. Its declination of about −57° places it on the southern side of this projected sky.'),
'Hamal':('Alpha Arietis','Aries','Hamal is an orange K-type giant in Aries. The III in its spectral classification identifies its giant luminosity class.'),
'Polaris':('Alpha Ursae Minoris','Ursa Minor','Polaris lies less than one degree from the north celestial pole in this J2000 catalogue. That is why its projected position sits close to the northern edge of the panorama.'),
'Aldebaran':('Alpha Tauri','Taurus','Aldebaran is an orange K-type giant in Taurus. At roughly 67 light-years, its light has travelled for decades before reaching Earth.'),
'Rigel':('Beta Orionis','Orion','Rigel is a blue-white supergiant in Orion. Its B8 Ia spectrum contrasts with the cooler red supergiant Betelgeuse in the same constellation.'),
'Capella':('Alpha Aurigae','Auriga','Capella’s bright central pair consists of two giant stars. Its combined light appears as one brilliant point to the unaided eye.'),
'Bellatrix':('Gamma Orionis','Orion','Bellatrix is a hot B-type giant in Orion. The catalogue places it a little north of the celestial equator, at a declination of about +6°.'),
'Betelgeuse':('Alpha Orionis','Orion','Betelgeuse is a red supergiant marking a shoulder of Orion. Hubble observed its extended ultraviolet atmosphere; this image is an observation, rather than an imagined stellar surface.'),
'Canopus':('Alpha Carinae','Carina','Canopus is a luminous F-type supergiant in Carina. At magnitude −0.62 in HYG, it is brighter in our sky than most other stars in this panorama.'),
'Sirius':('Alpha Canis Majoris','Canis Major','Sirius is the brightest night-sky star in this catalogue. Its negative apparent magnitude describes how bright it looks from Earth, rather than its intrinsic luminosity.'),
'Castor':('Alpha Geminorum','Gemini','Castor is one of the prominent named stars in Gemini. HYG records an A-type spectrum for the bright catalogue entry; the point represents unresolved light, not a resolved stellar disc.'),
'Procyon':('Alpha Canis Minoris','Canis Minor','Procyon is a nearby F-type star in Canis Minor. Its IV–V luminosity classification places it between the subgiant and main-sequence categories.'),
'Pollux':('Beta Geminorum','Gemini','Pollux is an orange giant in Gemini. Its K-type spectrum makes its light warmer in colour than the nearby A-type star Castor.'),
'Regulus':('Alpha Leonis','Leo','Regulus is a hot B-type star in Leo. The V in its catalogue spectrum identifies a main-sequence luminosity class.'),
'Spica':('Alpha Virginis','Virgo','Spica is a hot blue-white star in Virgo. Its B-type spectrum indicates a hotter surface than the yellow and orange stars in this panorama.'),
'Arcturus':('Alpha Boötis','Boötes','Arcturus is an orange giant in Boötes. Its catalogue distance is only about 37 light-years, much closer than many of the luminous supergiants shown here.'),
'Antares':('Alpha Scorpii','Scorpius','Antares has a red supergiant component and a hot B-type companion. HYG lists a composite spectrum, so the catalogue entry should not be read as the properties of a single isolated star.'),
'Vega':('Alpha Lyrae','Lyra','Vega is a nearby white A-type star in Lyra. Its apparent magnitude lies very close to zero, while its light takes about 25 years to reach Earth.'),
'Altair':('Alpha Aquilae','Aquila','Altair is a nearby A-type star in Aquila. HYG places it about 17 light-years away, one of the shorter light-travel distances among these featured stars.'),
'Deneb':('Alpha Cygni','Cygnus','Deneb is a white A-type supergiant in Cygnus. Its distance is difficult to establish, so the historical catalogue estimate shown here carries substantial uncertainty.'),
'Alnair':('Alpha Gruis','Grus','Alnair is a blue-white B-type star in Grus. At a declination near −47°, it belongs to the southern part of this celestial map.'),
'Fomalhaut':('Alpha Piscis Austrini','Piscis Austrinus','Fomalhaut is a nearby white A-type star in Piscis Austrinus. Its catalogue distance is about 25 light-years, similar to Vega’s even though they lie in different directions.')}
metadata={}
for s in stars:
 if s['name'] not in features:continue
 designation,constellation,description=features[s['name']]
 item=dict(designation=designation,constellation=constellation,description=description,source='https://github.com/astronexus/HYG-Database/blob/main/hyg/README.md')
 if s['name']=='Capella':item['source']='https://doi.org/10.1088/0004-637x/700/2/1349'
 if s['name']=='Deneb':item['distanceLabel']='Uncertain; HYG ≈ 1,410 ly'
 if s['name']=='Betelgeuse':
  item.update(distanceLabel='≈ 650 ly (uncertain)',image='/stars/betelgeuse-observation.jpg',imageAlt='Hubble observation of the ultraviolet atmosphere of Betelgeuse',credit='Andrea Dupree (Harvard-Smithsonian CfA), Ronald Gilliland (STScI), NASA and ESA',imageSource='https://esahubble.org/images/opo9604b/',source='https://esahubble.org/images/opo9604b/')
 metadata[s['id']]=item
 # Local equirectangular finding-chart crop, north up and east left; every dot is HYG.
 circles=[]
 for n in rows:
  if n['id']=='0' or float(n['mag'])>6:continue
  dra=(float(n['ra'])*15-s['ra']*15+180)%360-180
  dx=-dra*math.cos(math.radians(s['dec']))
  dy=-(float(n['dec'])-s['dec'])
  x=320+dx*16;y=140+dy*16
  if 8<x<632 and 8<y<272:
   radius=max(.65,2.8-float(n['mag'])*.34)
   circles.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{radius:.2f}" fill="#e6ebf6" opacity="{min(.95,max(.3,1-float(n["mag"])*.1)):.2f}"/>')
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 280"><title>{s["name"]} — catalogue illustration, not a photograph</title><rect width="640" height="280" fill="#0b1222"/><path d="M320 16v248M16 140h608" stroke="#9caec6" opacity=".12"/>{"".join(circles)}<circle cx="320" cy="140" r="14" fill="none" stroke="#c6d8ed" opacity=".7"/><path d="M320 9v14M9 140h14" stroke="#c6d8ed"/><g fill="#aebfd3" font-family="Arial,sans-serif" font-size="13"><text x="332" y="23">N</text><text x="16" y="130">E</text><text x="16" y="262">{s["name"]} · HYG {s["id"]}</text></g></svg>'
 Path(f'public/stars/{s["id"]}.svg').write_text(svg)
Path('data/featured-stars.ts').write_text('export interface FeaturedDetail {designation:string;constellation:string;description:string;source:string;distanceLabel?:string;image?:string;imageAlt?:string;credit?:string;imageSource?:string}\nexport const featuredStars: Readonly<Record<number, FeaturedDetail>> = '+json.dumps(metadata,ensure_ascii=False,indent=1)+';\n')
Path('data/star-provenance.json').write_text(json.dumps(dict(catalogue='HYG 4.1',source='https://github.com/astronexus/HYG-Database/blob/main/hyg/CURRENT/hygdata_v41.csv',gitBlob='ba2dec4eb0f6768914c7fc1051258100214ddf84',sha256=hashlib.sha256(source.read_bytes()).hexdigest(),license='CC BY-SA 4.0',selection='id > 0 and mag <= 3.5',stars=len(stars),featured=len(metadata)),indent=2)+'\n')
print(f'Prepared {len(stars)} real stars; {len(metadata)} featured. Raw source SHA256:',hashlib.sha256(source.read_bytes()).hexdigest())
