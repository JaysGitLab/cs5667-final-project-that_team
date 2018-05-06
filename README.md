#Park Reservations
This application is built on the MEAN web stack and will handle park registrations. 

**Remember, when you work on this, you need to change the output: path: variable in webpack.config.js to an absolute path to the build folder!** 

If you add routes at all in express.js you have to add the index's routes last because they
have a /something/* wildcard present.

make <a> tags but instead of link put a router link, look at the header.
Routes to get to a page are in the component file.

#REservationForm is defining the name of the form.

create admin.routes.ts and setup in admin.module.ts and then import this in app.module.ts
and angular module loading will handle everything from there.

module is a spec file __init__.py kind of file. This is where you tell it
where the imports are and everything for the page. The component renders the view
but the view is basically a piece of the component, how you visulaize the component.

Module imports fall through to the component most of the time, so the module file tells
you what component imports are needed.

RouterModule.forChild(ReservationRoutes) : tells router module to register ReservationRotues
for child object.

ReactiveFormsModule is something you must have in the background for any angular material

Need an admin.server.controller.js to perform validation to ensure username is already
in database. Then add the contoller to the socketio.js file.

to test open the mongo console and insert an admin account manually.

To insert new admin into mongo, run the mongo console and type:
use admin
show collections
db.users.insert({'firstName': 'Chris', 'lastName': 'Campell', 'username': 'campellcl', 'password': 'root'}
