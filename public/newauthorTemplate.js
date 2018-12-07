(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newauthor'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"answer-creator\">\r\n    <div class=\"info-post\">\r\n        "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n    <div class=\"info\">\r\n      <div class=\"author-post\">\r\n        by "
    + alias4(((helper = (helper = helpers.pauthor || (depth0 != null ? depth0.pauthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pauthor","hash":{},"data":data}) : helper)))
    + "\r\n      </div>\r\n      <div class=\"date-post\">\r\n        "
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "\r\n      </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();