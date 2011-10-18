
/*
 *
 * Model::Jobs
 *
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var job_schema = {
  id          : { type : ObjectId },
  created_at  : { type : Date, default: Date.now }
};

var JobSchema = new Schema(job_schema);
var Job = mongoose.model("Job", JobSchema);

module.exports = Job;

/* EOF */