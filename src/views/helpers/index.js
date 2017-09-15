/*
db    db  .8888.  dP     888888b 8888ba   .8888.     d8b   db  888888b d8888P
88    88 d8'  `8b 88     88      88  `8b d8'  `8b    88V8  88  88        88
Y8    8P 88    88 88     88aaa   88aa8P' 88    88    88 V8 88 a88aaa     88
`8b  d8' 88    88 88     88      88  `8b 88    88    88  V888  88        88
 `8bd8'  Y8.  .8P 88     88      88  .88 Y8.  .8P dP 88   V88  88        88
   YP     `888P'  88888P 888888P 888888'  `888P'  88 VP    8P  888888P   dP

ExpressJS for volebo.net

Copyright (C) 2016-2017 Volebo <dev@volebo.net>
Copyright (C) 2016-2017 Koryukov Maksim <maxkoryukov@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

const _               = require('lodash')
const debug           = require('debug')('volebo:express:views:helpers')

// TODO : #17 remove this: require('./views/helpers'),
module.exports = function(app) {
	const helpers = {
		t(key, ...args) {
			const options = args.pop()
			const hash = options.hash
			debug('called helper {{t}}:', key, args, hash)

			// TODO: it is not proven, that `this` == `res`, but seems, like it is true
			const res = this
			const langCode = res.lang.code

			let tr = _.get(app.localizations, `${langCode}.${key}`)
			if (_.isNil(tr)) {
				app.log.error({
					'langCode': langCode,
					'key': key,
				}, 'Translation key is not defined')

				tr = key
			}
			return tr
		},

		linkTo(path) {
			return path
		}
	}

	return helpers
}
