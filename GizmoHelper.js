/**
 * @author ruinalmeida / https://github.com/ruinalmeida
 */
// This is a 3D Gizmo helper for object manipulation.

THREE.GizmoHelper = function(container, otherControls, renderer, camera, scene) {

    var matt,matt1,matt2;
    var matth = [];
    var drag;
    var dragging = false;
    var pre_dragging = false;
    this.helperGizmo;
    var targetGizmo = new THREE.Vector3(0, 0, 0);
    this.nameGizmo = 'helpergGIZMO';
    var INTERSECTED1, INTERSECTED, dragging;
    helperGizmo = new THREE.Object3D();
    var activate = {active: false};
    $.extend(THREE.Object3D(), activate);
    container.on('mousemove', onGizmoMouseMove);
    container.on('mouseup', onGizmoMouseUp);
    container.on('mousedown', onGizmoMouseDown);
    AddGizmo(scene, 1)
    function onGizmoMouseUp(event) {
        event.preventDefault();
        dragging = false;
        if (otherControls)
            otherControls.enabled = true;
    }
    function onGizmoMouseDown(event) {
        var vx = parseInt((event.clientX - renderer.domElement.offsetParent.offsetLeft - renderer.domElement.offsetLeft)) / renderer.domElement.width;
        var vy = parseInt((event.clientY - renderer.domElement.offsetParent.offsetTop - renderer.domElement.offsetTop)) / renderer.domElement.height;
        var vector = new THREE.Vector3((vx) * 2 - 1, -(vy) * 2 + 1, -0.5);
        projector = new THREE.Projector();
        projector.unprojectVector(vector, camera);
        raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects0;
        intersects1 = new Array();

        FindIntersectsG(scene);
        var mindis = Infinity;
        if (pre_dragging) {
            dragging = true;

            helperGizmo.active = true;
        }
        else
        {
            for (i = intersects1.length - 1; i >= 0; i--) {
                obj1 = intersects1[ i ];

                if (intersects1[ i ].object.name.substring(0, 6) != 'helper')
                {
                    if (obj1.distance <= mindis)
                    {
                        mindis = obj1.distance;
                        intersects0 = obj1;
                    }
                }
            }
            if (intersects0)
            {
                helperGizmo.active = true;
                matt.opacity = 0.25;
                matt1.opacity = 0.25;
                matt2.opacity = 0.25;
                var dist = intersects0.object.position.distanceTo(camera.position);
                helperGizmo.scale = new THREE.Vector3(dist / 10, dist / 10, dist / 10);
                current_object = intersects0.object.name;
                helperGizmo.position = intersects0.object.position;
                INTERSECTED = intersects0.object
            }
            else
            {
                dragging = false;
                otherControls.enabled = true;

            }
        }
    }
    function onGizmoMouseMove(event) {
        event.preventDefault();
        if (dragging)
        {
            otherControls.enabled = false;
        }
        var vx = parseInt((event.clientX - renderer.domElement.offsetParent.offsetLeft - renderer.domElement.offsetLeft)) / renderer.domElement.width;
        var vy = parseInt((event.clientY - renderer.domElement.offsetParent.offsetTop - renderer.domElement.offsetTop)) / renderer.domElement.height;
        var vector = new THREE.Vector3((vx) * 2 - 1, -(vy) * 2 + 1, -0.5);
        projector = new THREE.Projector();
        projector.unprojectVector(vector, camera);
        raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        //   var intersects0;
        intersects1 = new Array();
        if (helperGizmo.active)
        {
            FindIntersectsG(helperGizmo);
        }
        var dist = 99999999999999999;
        var vald;

        var gizmo_end = helperGizmo.scale.x / 2;
        var gx = helperGizmo.position.x;
        var gy = helperGizmo.position.y;
        var gz = helperGizmo.position.z;
        var g1 = new THREE.Vector3(gx + 0, gy + 0, gz + gizmo_end);
        var g2 = new THREE.Vector3(gx + 0, gy + 0, gz - gizmo_end);
        var g3 = new THREE.Vector3(gx + 0, gy + gizmo_end, gz + 0);
        var g4 = new THREE.Vector3(gx + 0, gy - gizmo_end, gz + 0);
        var g5 = new THREE.Vector3(gx + gizmo_end, gy + 0, gz + 0);
        var g6 = new THREE.Vector3(gx - gizmo_end, gy + 0, gz + 0);


        for (i = intersects1.length - 1; i >= 0; i--) {
            obj1 = intersects1[ i ];
            vlad = 0;
            if (intersects1[ i ].object.name.substring(0, 11) == 'helperplane')
            {
                var d1 = intersects1[ i ].point.distanceTo(g1);

                if (d1 < dist)
                {
                    dist = d1;
                    vald = 1;
                    INTERSECTED1 = intersects1[i];
                }
                var d2 = intersects1[ i ].point.distanceTo(g2);
                if (d2 < dist)
                {
                    dist = d2;
                    vald = 2;
                    INTERSECTED1 = intersects1[i];
                }
                var d3 = intersects1[ i ].point.distanceTo(g3);
                if (d3 < dist)
                {
                    dist = d3;
                    vald = 3;
                    INTERSECTED1 = intersects1[i];
                }
                var d4 = intersects1[ i ].point.distanceTo(g4)
                if (d4 < dist)
                {
                    dist = d4;
                    vald = 4;
                    INTERSECTED1 = intersects1[i];
                }
                var d5 = intersects1[ i ].point.distanceTo(g5)
                if (d5 < dist)
                {
                    dist = d5;
                    vald = 5;
                    INTERSECTED1 = intersects1[i];
                }
                var d6 = intersects1[ i ].point.distanceTo(g6)

                if (d6 < dist)
                {
                    dist = d6;
                    vald = 6;
                    INTERSECTED1 = intersects1[i];
                }

                if (dragging)
                {
                    if (drag == 3 || drag == 4)
                    {
                        targetGizmo = new THREE.Vector3(INTERSECTED.position.x, INTERSECTED1.point.y, INTERSECTED.position.z);
                    }
                    if (drag == 1 || drag == 2)
                    {
                        targetGizmo = new THREE.Vector3(INTERSECTED.position.x, INTERSECTED.position.y, INTERSECTED1.point.z);
                    }
                    if (drag == 5 || drag == 6)
                    {
                        targetGizmo = new THREE.Vector3(INTERSECTED1.point.x, INTERSECTED.position.y, INTERSECTED.position.z);
                    }
                    helperGizmo.position = targetGizmo;
                    INTERSECTED.position = targetGizmo
                }

                if (!dragging)
                {

                    if (dist < gizmo_end / 2)
                    {

                        drag = vald;
                        $(this).css('cursor', 'move');
                        pre_dragging = true;

                        if ((vald == 5 || vald == 6))
                        {
                            matt.opacity = 1;

                        }
                        else
                        {
                            matt.opacity = 0.25;
                        }
                        if ((vald == 3 || vald == 4))
                        {
                            matt2.opacity = 1;
                        }
                        else
                        {
                            matt2.opacity = 0.25;
                        }
                        if ((vald == 1 || vald == 2))
                        {
                            matt1.opacity = 1;
                        }
                        else
                        {
                            matt1.opacity = 0.25;
                        }
                        stop = true;
                    }
                    else
                    {
                        $(this).css('cursor', 'auto');
                        dragging = false;
                        pre_dragging = false;
                    }
                }
            }
        }

    }
    function AddGizmo(obj, size)
    {
        matt = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0,
            combine: THREE.MixOperation,
            reflectivity: 0.25,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            side: THREE.FrontSide
        });
        matt1 = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            opacity: 0,
            combine: THREE.MixOperation,
            reflectivity: 0.25,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            side: THREE.FrontSide
        });
        matt2 = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0,
            combine: THREE.MixOperation,
            reflectivity: 0.15,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            side: THREE.FrontSide
        });

        matth['helperplane1'] = new THREE.MeshBasicMaterial({
            opacity: 0.0,
            transparent: true,
            side: THREE.DoubleSide
        });
        matth['helperplane2'] = new THREE.MeshBasicMaterial({
            opacity: 0.0,
            transparent: true,
            side: THREE.DoubleSide
        });
        matth['helperplane3'] = new THREE.MeshBasicMaterial({
            opacity: 0.0,
            transparent: true,
            side: THREE.DoubleSide
        });


        helperGizmo.rotation = new THREE.Euler(0, 0, 90 * Math.PI / 180, 'XYZ');
        var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(size / 80, size / 80, size, 4, 1, false), matt);
        mesh1.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
        mesh1.name = 'helperg1'
        helperGizmo.add(mesh1);

        var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(size / 80, size / 80, size, 4, 1, false), matt1);
        mesh2.rotation = new THREE.Euler(90 * Math.PI / 180, 0, 0, 'XYZ');
        mesh2.name = 'helperg2'
        helperGizmo.add(mesh2)

        var mesh3 = new THREE.Mesh(new THREE.CylinderGeometry(size / 80, size / 80, size, 4, 1, false), matt2);
        mesh3.rotation = new THREE.Euler(0, 0, 90 * Math.PI / 180, 'XYZ');
        mesh3.name = 'helperg3'
        helperGizmo.add(mesh3)

        helperGizmo.position = new THREE.Vector3(0, 0, 0);
        var geomPlane = new THREE.PlaneGeometry(5000000, 5000000);
        var mesh4 = new THREE.Mesh(geomPlane, matth['helperplane1']);
        mesh4.rotation = new THREE.Euler(0, 0, 90 * Math.PI / 180, 'XYZ');
        mesh4.name = 'helperplane1'
        helperGizmo.add(mesh4)
        var mesh5 = new THREE.Mesh(geomPlane, matth['helperplane2']);
        mesh5.rotation = new THREE.Euler(0, 90 * Math.PI / 180, 0, 'XYZ');
        mesh5.name = 'helperplane2'
        helperGizmo.add(mesh5)
        var mesh6 = new THREE.Mesh(geomPlane, matth['helperplane3']);
        mesh6.rotation = new THREE.Euler(90 * Math.PI / 180, 0, 0, 'XYZ');
        mesh6.name = 'helperplane3'
        helperGizmo.add(mesh6)
        obj.add(helperGizmo);


    }

    function FindIntersectsG(obj) {
        for (var j = obj.children.length - 1; j >= 0; j--) {
            var intersects = raycaster.intersectObjects(obj.children);
            for (var i = intersects.length - 1; i >= 0; i--) {
                intersects1.push(intersects[i]);
            }
        }
    }


};

THREE.GizmoHelper.prototype = Object.create(THREE.EventDispatcher.prototype);
