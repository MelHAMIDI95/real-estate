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
    res.render( 'home', {
        message: 'The Home Page!',
        test: 'Hi'
    });
});



//Premier site : leboncoin
request( 'https://www.leboncoin.fr/ventes_immobilieres/1073837003.htm?ca=12_s', function ( error, response, html ) {
    if ( !error && response.statusCode == 200 ) {
        var $ = cheerio.load( html );
        var prix = parseInt( $( 'h2.item_price span.value' ).get()[0].children[0].data.replace( /\s/g, '' ), 10 );
        //get()[0] on prend la premiere valeur, data.replace (/.../g, 'par ce qu'on veut remplacer', on a mis /s pcq c'est des blank space par rien : '')
        //parseInt enlève le €        
        console.log( prix );

        var ville = $( 'div.line.line_city span.value' ).get()[0].children[0].data.replace( /\s/g, '' );
        console.log( ville );

        var typedeBien = $( 'h2.clearfix span.value' ).get()[2].children[0].data.replace( /\s/g, '' );
        console.log( typedeBien );

        var pieces = $( 'h2.clearfix span.value' ).get()[3].children[0].data.replace( /\s/g, '' );
        console.log( pieces );

        var surface = $( 'h2.clearfix span.value' ).get()[4].children[0].data.replace( /\s/g, '' );
        console.log( surface );

        var ges = $( ' span.value' ).get()[5].children[0].data.replace( /\s/g, '' );
        console.log( ges );


        //Deuxieme site : meilleursagents
        request( 'https://www.meilleursagents.com/prix-immobilier/courbevoie-92400/', function ( error, response, html ) {
            if ( !error && response.statusCode == 200 ) {
                var $ = cheerio.load( html );

                var prixtxt = $( 'div.prices-summary__values div.prices-summary__cell--row-header' ).get( 0 ).children[0].data.replace( /\s/g, '' );
                //prix m2 maison
                var prix2 = parseInt( $( 'div.prices-summary__values div.prices-summary__cell--median' ).get( 1 ).children[0].data.replace( /\s/g, '' ), 10 );
                console.log( prix2 );

                console.log( prixtxt );
            }
        });


        //launch the server on the 3000 port
        app.listen( 3000, function () {
            console.log( 'App listening on port 3000!' );
        });
    }
})
