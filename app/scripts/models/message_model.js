/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Webstudio.Message = DS.Model.extend(Webstudio.MixinContent, {
    userID: DS.attr('string', {defaultValue: ""}),
    author_id: DS.attr('string', {defaultValue: ""})
   
});