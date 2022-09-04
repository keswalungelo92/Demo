[
  {
    "name": "Rich Text Editor",
    "alias": "rte",
    "view": "rte",
    "icon": "icon-article"
  },
  {
    "name": "Quote",
    "nameTemplate": "{{ value ? value.substring(0,32) + (value.length > 32 ? '...' : '') : '' }}",
    "alias": "quote",
    "view": "textstring",
    "icon": "icon-quote",
    "config": {
      "style": "border-left: 3px solid #ccc; padding: 10px; color: #ccc; font-family: serif; font-style: italic; font-size: 18px",
      "markup": "<blockquote>#value#</blockquote>"
    }
  },
  // {
  //   "name": "Icon Info Element",
  //   "nameTemplate": "{{ value ? value.substring(0,32) + (value.length > 32 ? '...' : '') : '' }}",
  //   "alias": "iconInfoElement",
  //   "view": "textstring",
  //   "icon": "icon-science color-orange",
  //   "config": {
  //     "style": "border-left: 3px solid #ccc; padding: 10px; color: #ccc; font-family: serif; font-style: italic; font-size: 18px",
  //     "markup": "<blockquote>#value#</blockquote>"
  //   }
  // },
  {
    "name": "Icon Info Element",
    "alias": "iconInfoElement",
    "view": "/App_Plugins/DocTypeGridEditor/Views/doctypegrideditor.html",
    "render": "/App_Plugins/DocTypeGridEditor/Render/DocTypeGridEditor.cshtml",
    "icon": "icon-science color-orange",
    "config": {
      "allowedDocTypes": ["iconInfoElement"],
      "nameTemplate": "",
      "enablePreview": true,
      "viewPath": "/Views/Partials/NestedElements/",
      "previewViewPath": "/Views/Partials/NestedElements/",
      "previewCssFilePath": "/Css/",
      "previewJsFilePath": ""
    }
  },
  
]
