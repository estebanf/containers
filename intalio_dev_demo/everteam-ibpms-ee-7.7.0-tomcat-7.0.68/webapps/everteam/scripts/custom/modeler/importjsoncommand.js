/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

if (!WAPAMA.Plugins) {
  WAPAMA.Plugins = new Object();
}

WAPAMA.Plugins.ImportJSONCommand = WAPAMA.Core.Command.extend({
  construct : function(jsonObject, createShapes, facade) {
    this.jsonObject = jsonObject;
    this.facade = facade;
    this.shapes;
    this.connections = [];
    this.parents = new Hash();
    this.selection = this.facade.getSelection();
    this.loadSerialized = createShapes;
  },
  execute : function() {

    if (!this.shapes) {
      // Import the shapes out of the serialization
      this.shapes = this.loadSerialized(this.jsonObject);

      // store all connections
      this.shapes.each(function(shape) {
        shape.isNew = true;
        if (shape.getDockers) {
          var dockers = shape.getDockers();
          if (dockers) {
            if (dockers.length > 0) {
              this.connections.push([ dockers.first(),
                  dockers.first().getDockedShape(),
                  dockers.first().referencePoint ]);
            }
            if (dockers.length > 1) {
              this.connections.push([ dockers.last(),
                  dockers.last().getDockedShape(),
                  dockers.last().referencePoint ]);
            }
          }
        }

        // store parents
        this.parents[shape.id] = shape.parent;
      }.bind(this));
    } else {
      this.shapes.each(function(shape) {
        this.parents[shape.id].add(shape);
      }.bind(this));

      this.connections.each(function(con) {
        con[0].setDockedShape(con[1]);
        con[0].setReferencePoint(con[2]);
        // con[0].update();
      });
    }

    // this.parents.values().uniq().invoke("update");
    this.facade.getCanvas().update();

    this.facade.setSelection(this.shapes);
  },
  rollback : function() {
    var selection = this.facade.getSelection();

    this.shapes.each(function(shape) {
      selection = selection.without(shape);
      this.facade.deleteShape(shape);
    }.bind(this));

    this.facade.getCanvas().update();

    this.facade.setSelection(selection);
  }
});