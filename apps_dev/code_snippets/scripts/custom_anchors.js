"use strict"

import b4w from "blend4web";

var m_anchors = b4w.anchors;
var m_app     = b4w.app;
var m_cfg     = b4w.config;
var m_data    = b4w.data;
var m_scs     = b4w.scenes;
var m_version = b4w.version;

var DEBUG = (m_version.type() === "DEBUG");

var APP_ASSETS_PATH = m_cfg.get_std_assets_path() + "code_snippets/custom_anchors/";

export function init() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        physics_enabled: false,
        show_fps: true,
        alpha: false,
        autoresize: true,
        assets_dds_available: !DEBUG,
        assets_min50_available: !DEBUG,
        console_verbose: true
    });
}

function init_cb(canvas_elem, success) {
    if (!success) {
        console.log("b4w init failure");
        return;
    }

    // "Custom Element" anchor requires predefined HTML element
    // which need to be created before data load
    var torus_text = document.createElement("span");
    torus_text.id = "torus_anchor";
    torus_text.style.position = "absolute";
    torus_text.style.backgroundColor = "blue";
    torus_text.style.color = "white";
    torus_text.style.padding = "5px";
    torus_text.style.visibility = "hidden";
    torus_text.innerHTML = "Torus (Custom Element)";
    document.body.appendChild(torus_text);

    m_data.load(APP_ASSETS_PATH + "custom_anchors.json", load_cb);
}

function load_cb(data_id) {
    m_app.enable_camera_controls(false, false, false, null, true);

    // "Generic" anchor may be created (or replaced) anytime
    var cyl_text = document.createElement("span");
    cyl_text.id = "cyl_anchor";
    cyl_text.style.position = "absolute";
    cyl_text.style.backgroundColor = "yellow";
    cyl_text.style.color = "black";
    cyl_text.style.padding = "5px";
    cyl_text.innerHTML = "Cylinder (Generic)";
    document.body.appendChild(cyl_text);

    var cyl_anchor = m_scs.get_object_by_name("CylAnchor");

    m_anchors.attach_move_cb(cyl_anchor, function(x, y, appearance, obj, elem) {
        var anchor_elem = document.getElementById("cyl_anchor");
        anchor_elem.style.left = x + "px";
        anchor_elem.style.top = y + "px";

        if (appearance == "visible")
            anchor_elem.style.visibility = "visible";
        else
            anchor_elem.style.visibility = "hidden";
    });
}

