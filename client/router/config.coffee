Router.configure
  notFoundTemplate: 'notFound'    
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  yieldTemplates:
    header:
      to: 'header'
    footer:
      to: 'footer'
  before: ->
    $('meta[name^="description"]').remove()
