# CHANGELOG

## v1.1.0

- Added support for registering events to elements

## v1.0.2

- Fixed an issue where children of an element would be removed if updated with `h`.

## v1.0.1

- Updated errors in examples in README. (class -> cls).

## v1.0.0

- Changelog added
- Removed use of `attrs` property, now if a param is not `cls` or `style`, it will be treated as a regular html attribute. E.g. `span({attrs: {id: 'id'}})` -> `span({id: 'id'})`
- Added jsdoc definitions for buildless solutions
