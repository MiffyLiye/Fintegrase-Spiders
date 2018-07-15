function Index(appId, machineId, firstYear, timestampPrecision) {
  var _timestampLength = 7;
  var _appIdLength = 1;
  var _machineIdLength = 5;
  var _sequenceLength = 2;
  var _encodingBitsPerChar = Math.log2(32);

  var _base32bitmap = [];
  var _lastTimestamp = 0;
  var _sequence = 0;

  var _timestampOffset = (new Date((firstYear || 1970) + '-01-01')).getTime();
  this.clock = {
    getTimestamp: function () {
      return Math.floor((Date.now() - _timestampOffset) / (timestampPrecision || 1000));
    }
  };

  var _init = function () {
    var _includes = function (a, c) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === c) {
          return true;
        }
      }
      return false;
    };
    var _pushCharsTo = function (bitmap, from, length, excludes) {
      for (var i = 0; i < length; i++) {
        var c = String.fromCharCode(from.charCodeAt(0) + i);
        if (_includes(excludes, c)) {
          continue;
        }
        bitmap.push(c);
      }
    };
    var _excludes = ['o', 'l', 'g', 'q'];
    _pushCharsTo(_base32bitmap, '0', 10, _excludes);
    _pushCharsTo(_base32bitmap, 'a', 26, _excludes);
  };
  _init();

  var _extractBitsFrom = function (n, begin, end) {
    return (n % Math.pow(2, end) - n % Math.pow(2, begin)) / Math.pow(2, begin);
  };

  var _base32encode = function (number, length) {
    var chars = new Array(length);
    for (var i = 0; i < length; i++) {
      var bits = _extractBitsFrom(number, i * _encodingBitsPerChar, (i + 1) * _encodingBitsPerChar);
      chars[i] = _base32bitmap[bits];
    }

    return chars.reverse().join('');
  };

  var _resetStateIfNewTimestamp = function (timestamp) {
    if (timestamp > _lastTimestamp) {
      _sequence = 0;
      _lastTimestamp = timestamp;
    }
  };

  var _fixedTimestampIfClockShiftedBack = function (timestamp) {
    if (timestamp < _lastTimestamp) {
      timestamp = _lastTimestamp;
    }
    return timestamp;
  };

  var _updateSequenceAndTimestamp = function () {
    _sequence = _sequence + 1;
    _sequence = _sequence % Math.pow(2, _sequenceLength * _encodingBitsPerChar);
    if (_sequence === 0) {
      _lastTimestamp = _lastTimestamp + 1;
    }
  };

  var _appIdCode = _base32encode(appId || 0, _appIdLength);
  var _machineIdCode = _base32encode(machineId || 0, _machineIdLength);

  this.nextId = function () {
    var timestamp = this.clock.getTimestamp();
    _resetStateIfNewTimestamp(timestamp);
    timestamp = _fixedTimestampIfClockShiftedBack(timestamp);

    var timestampCode = _base32encode(timestamp, _timestampLength);
    var sequenceCode = _base32encode(_sequence, _sequenceLength);

    _updateSequenceAndTimestamp();

    return timestampCode + _appIdCode + _machineIdCode + sequenceCode;
  };
}

module.exports = Index;
