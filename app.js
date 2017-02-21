//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );


//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );

//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {


    // var siteurl = req.query.url;
    // if ( siteurl ) {
    //Premier site : leboncoin
    request( /*siteurl,*/ 'https://www.leboncoin.fr/ventes_immobilieres/1007107629.htm?ca=12_s', function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            var $ = cheerio.load( html );
            var prix = parseInt( $( 'h2.item_price span.value' ).get()[0].children[0].data.replace( /\s/g, '' ), 10 );
            //get()[0] on prend la premiere valeur, data.replace (/.../g, 'par ce qu'on veut remplacer', on a mis /s pcq c'est des blank space par rien : '')
            //parseInt enlève le €        
            console.log( prix );

            var ville = $( 'div.line.line_city span.value' ).get()[0].children[0].data.trim().replace( /\s/g, '-' );
            console.log( ville );

            var typedeBien = $( 'h2.clearfix span.value' ).get()[2].children[0].data.replace( /\s/g, '' );
            console.log( typedeBien );

            var pieces = $( 'h2.clearfix span.value' ).get()[3].children[0].data.replace( /\s/g, '' );
            console.log( pieces );

            var surface = $( 'h2.clearfix span.value' ).get()[4].children[0].data.replace( /\s/g, '' );
            console.log( surface );

            var ges = $( ' span.value' ).get()[6].children[0].data.replace( /\s/g, '' );
            console.log( ges );

            var classeEnergie = $( ' span.value' ).get()[7].children[0].data.replace( /\s/g, '' );
            console.log( classeEnergie );

        }
    });

    //Deuxieme site : meilleursagents
    request( 'https://www.meilleursagents.com/prix-immobilier/courbevoie-92400/' /*+ ville*/, function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            var $ = cheerio.load( html );

            //var prixtxt = $( 'div.prices-summary__values div.prices-summary__cell--row-header' ).get( 0 ).children[0].data.replace( /\s/g, '' );
            //prix m2 maison
            //console.log( prixtxt );
            var prix2 = parseInt( $( 'div.prices-summary__values div.prices-summary__cell--median' ).get( 1 ).children[0].data.replace( /\s/g, '' ), 10 );
            console.log( prix2 );

        }
    });


    //  }
    //else {

    res.render( 'home', {
        message: '! ',
        message2: 'Entrez URL leboncoin : ',
        message3: 'Entrez URL meilleursagents : ',


    });
});


//launch the server on the 3000 port    
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});




//});



