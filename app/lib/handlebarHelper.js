/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Handlebars.registerHelper('exists', function(variable, options) {
    if (typeof variable !== null) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('gettimeago', function(variable, options) {


    return jQuery.timeago(variable);
});