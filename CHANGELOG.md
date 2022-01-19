# CHANGELOG

## v1.0.0

- Changelog added
- Removed use of `attrs` property, now if a param is not `cls` or `style`, it will be treated as a regular html attribute. E.g. `span({attrs: {id: 'id'}})` -> `span({id: 'id'})`
- Added jsdoc definitions for buildless solutions
