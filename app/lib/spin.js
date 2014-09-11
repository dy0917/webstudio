

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );








var loader = document.getElementById('la-anim-6-loader')
, border = document.getElementById('la-anim-6-border')
, α = 0
, π = Math.PI
, t = 15

, tdraw;

function PieDraw() {
    α++;
    α %= 360;
    var r = ( α * π / 180 )
    , x = Math.sin( r ) * 250
    , y = Math.cos( r ) * - 250
    , mid = ( α > 180 ) ? 1 : 0
    , anim = 'M 0 0 v -250 A 250 250 1 ' 
    + mid + ' 1 ' 
    +  x  + ' ' 
    +  y  + ' z';

    loader.setAttribute( 'd', anim );
    border.setAttribute( 'd', anim );
    if( α != 0 )
                tdraw = setTimeout(PieDraw, t); // Redraw
        }

        function PieReset() {
            clearTimeout(tdraw);
            var anim = 'M 0 0 v -250 A 250 250 1 0 1 0 -250 z';
            loader.setAttribute( 'd', anim );
            border.setAttribute( 'd', anim );
        }

        var inProgress = false;

        Array.prototype.slice.call( document.querySelectorAll( '#la-buttons > button' ) ).forEach( function( el, i ) {
            var anim = el.getAttribute( 'data-anim' ),
            animEl = document.querySelector( '.' + anim );

            el.addEventListener( 'click', function() {
                if( inProgress ) return false;
                inProgress = true;
                classie.add( animEl, 'la-animate' );

                if( anim === 'la-anim-6' ) {
                    PieDraw();
                }

                setTimeout( function() {
                    classie.remove( animEl, 'la-animate' );

                    if( anim === 'la-anim-6' ) {
                        PieReset();
                    }

                    inProgress = false;
                }, 6000 );
            } );
        } );
