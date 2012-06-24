/*global YUI*/

YUI.add('mediaLibrary', function(Y)
{
	// Namespace
	Y.namespace('TwoAndaHalfPeople');
	
	// Class
	Y.TwoAndaHalfPeople.MediaLibrary = function()
	{
		var AudioTrack = Y.TwoAndaHalfPeople.AudioTrack;
		
		return [
			new AudioTrack('Ain\'t Misbehavin\'','Fats Waller','Jazz','aint_misbehavin.mp3',1),
			new AudioTrack('American Patrol','Glenn Miller','Small Band','american_patrol2.mp3',2),
			new AudioTrack('Autumn Leaves','J. Kosma','Jazz','autumn_leaves2.mp3',3),
			new AudioTrack('Pick Up The Pieces','Average White Band','Small Band','pick_up_the_pieces.mp3',4),
			new AudioTrack('When I Fall In Love','Nat King Cole','Small Band','when_i_fall_in_love.mp3',5),
			new AudioTrack('Just the Two of Us','Bill Withers','Pop/Soundtrack','just_the_2_of_us.mp3',6),
			new AudioTrack('Canon','J. Pachelbel','Classical','canon.mp3',7),
			new AudioTrack('Tiger Rag','Scott Joplin','Jazz','tiger_rag2.mp3',8),
			new AudioTrack('Sir Duke','Stevie Wonder','Jazz','sir_duke.mp3',9),
			new AudioTrack('Witchcraft','Cy Coleman','Small Band','witchcraft.mp3',10),
			new AudioTrack('Cha Cha (from West Side Story)','L. Bernstein','Small Band','ws_cha_cha.mp3',11),
			new AudioTrack('Summertime (from Porgy &amp; Bess)','G. Gershwin','Jazz','summertime2.mp3',12),
			new AudioTrack('Round Midnight','Thelonius Monk','Jazz','round_midnight2.mp3',13),
			new AudioTrack('Ulla in Africa','H. Wiberny','Small Band','ulla.mp3',14),
			new AudioTrack('Small Dream of a Dance','P. Mitchell-Davidson','Contemporary','small_dreams.mp3',15),
			new AudioTrack('Strike Up The Band','G. Gershwin','Small Band','strike_up_the_band.mp3',16),
			new AudioTrack('Hoe Down','W. Gregory','Small Band','hoe_down.mp3',17),
			new AudioTrack('The Chicken','Jaco Pastorius','Small Band','the_chicken.mp3',18),
			new AudioTrack('Air on a G String','J.S. Bach','Classical','air_on_a_g_string.mp3',19),
			new AudioTrack('Oh When the Saints','Traditional','Jazz','oh_when_the_saints.mp3',20),
			new AudioTrack('I\'ve Got Rhythm','G. Gershwin','Small Band','ive_got_rhythm.mp3',21),
			new AudioTrack('In The Mood','Glenn Miller','Jazz','in_the_mood.mp3',22),
			new AudioTrack('Theme from Pink Panther','H. Mancini','Pop/Soundtrack','pink_panther.mp3',23),
			new AudioTrack('Viva La Vida','Coldplay','Pop/Soundtrack','viva_la_vida.mp3',24),
			new AudioTrack('Ballade','Simon Hendry','Jazz','ballade2.mp3',25),
			new AudioTrack('It Don\'t Mean a Thing','Duke Ellington','Jazz','it_dont_mean_a_thing.mp3',26),
			new AudioTrack('A Foggy Day','G. Gershwin','Small Band','a_foggy_day.mp3',27),
			new AudioTrack('We\'ve Only Just Begun','Paul Williams','Small Band','weve_only_just_begun.mp3',28),
			new AudioTrack('Scherzo (from West Side Story)','L. Bernstein','Classical','ws_scherzo.mp3',29),
			new AudioTrack('Saxophone Quartet - Mv. 1','Philip Glass','Contemporary','glass_mvt1.mp3',30),
			new AudioTrack('The Swan','C. Saint-Saens','Classical','swan.mp3',31),
			new AudioTrack('What a Wonderful World','Louis Armstrong','Pop/Soundtrack','wonderful_world.mp3',32),
			new AudioTrack('For Once in my Life','Stevie Wonder','Pop/Soundtrack','for_once_in_my_life.mp3',33),
			new AudioTrack('Cold Duck Time','Eddie Harris','Small Band','cold_duck_time.mp3',34),
			new AudioTrack('An American in Paris','G. Gershwin','Pop/Soundtrack','american_in_paris.mp3',35),
			new AudioTrack('Preludes - Minuet','C. Debussy','Classical','debussy_minuet.mp3',36),
			new AudioTrack('Three Preludes - Mv. 1','G. Gershwin','Contemporary','gershwin_preludes.mp3',37),
			new AudioTrack('Shenandoah','Traditional','Classical','shenandoah.mp3',38),
			new AudioTrack('I Wish','Stevie Wonder','Small Band','i_wish.mp3',39),
			new AudioTrack('All That Jazz (from Chicago)','Kinder &amp; Ebb','Pop/Soundtrack','all_that_jazz.mp3',40),
			new AudioTrack('Saxophone Quartet - Mv. 4','Philip Glass','Contemporary','glass_mvt4.mp3',41),
			new AudioTrack('Preludes - Bateau','C. Debussy','Classical','debussy_bateau.mp3',42),
			new AudioTrack('Full English','Mike Mower','Small Band','full_english.mp3',43),
			new AudioTrack('Peanut Vendor','Gonzalo G. de Mello','Small Band','peanut_vendor.mp3',44),
			new AudioTrack('Theme from Singing in the Rain','Herb Brown','Pop/Soundtrack','singing_in_the_rain.mp3',45),
			new AudioTrack('Nice Work If You Can Get It','G. Gershwin','Small Band','nice_work2.mp3',46),
			new AudioTrack('Man in the Mirror','Michael Jackson','Pop/Soundtrack','man_in_the_mirror.mp3',47),
			new AudioTrack('Three Preludes - Mv. 2','G. Gershwin','Contemporary','gershwin_mvt2.mp3',48),
			new AudioTrack('Clair de lune','C. Debussy','Classical','clair_de_lune.mp3',49),
			new AudioTrack('Yakety Sax (Theme from Benny Hill)','Boots Randolph','Pop/Soundtrack','benny_hill.mp3',50),
			new AudioTrack('Preludes - Ballet','C. Debussy','Classical','debussy_ballet.mp3',51),
			new AudioTrack('Bohemian Rhapsody','Queen','Pop/Soundtrack','bohemian_rhapsody.mp3',52),
			new AudioTrack('Flight of the Bumblebee','N. Rimsky-Korsakov','Classical','bumblebee.mp3',53)
		];
	};
}, { requires: ['audioTrack']});