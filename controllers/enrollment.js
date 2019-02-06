const moment = require('moment');
const mongoose = require('mongoose');

const Parent = require('../models/parent');
const Student = require('../models/student');
const Enrollment = require('../models/enrollment');

exports.getAll = async (req, res) => {
    let { newToken } = req;

    try {
        let enrollments = await Enrollment.find().populate('student').populate('parent').exec();

        const response = {
            newToken,
            list: enrollments.map(enrollment => {
                return {
                    Id: enrollment._id,
                    HighSchool: enrollment.highSchool,
                    SchoolClassification: enrollment.schoolClassification,
                    SchoolLocation: enrollment.schoolLocation,
                    PreferredStrand: enrollment.preferredStrand,
                    Student: {
                        Id: enrollment.student._id,
                        FirstName: enrollment.student.firstName,
                        LastName: enrollment.student.lastName,
                        Age: enrollment.student.age,
                        Gender: enrollment.student.gender,
                        MobileNo: enrollment.student.mobileNo
                    },
                    Parent: {
                        Id: enrollment.parent._id,
                        FirstName: enrollment.parent.firstName,
                        LastName: enrollment.parent.lastName,
                        MobileNo: enrollment.parent.mobileNo
                    },
                    CreatedAt: enrollment.createdAt,
                    UpdatedAt: enrollment.updatedAt
                }
            }),
            count: enrollments.length,
            message: 'Items successfully fetched.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
    }
};

exports.createEnrollment = async (req, res) => {
    let { newToken } = req;

    let {
        HighSchool,
        SchoolClassification,
        SchoolLocation,
        PreferredStrand,
        StudentFirstName,
        StudentLastName,
        StudentAge,
        StudentGender,
        StudentMobileNo,
        ParentFirstName,
        ParentLastName,
        ParentMobileNo
    } = req.body;

    try {
        const student = new Student({
            _id: new mongoose.Types.ObjectId(),
            firstName: StudentFirstName,
            lastName: StudentLastName,
            age: StudentAge,
            gender: StudentGender,
            mobileNo: StudentMobileNo
        });

        let createdStudent = await student.save();

        const parent = new Parent({
            _id: new mongoose.Types.ObjectId(),
            firstName: ParentFirstName,
            lastName: ParentLastName,
            mobileNo: ParentMobileNo
        });

        let createdParent = await parent.save();

        const enrollment = new Enrollment({
            _id: new mongoose.Types.ObjectId(),
            highSchool: HighSchool,
            schoolClassification: SchoolClassification,
            schoolLocation: SchoolLocation,
            preferredStrand: PreferredStrand,
            student: student._id,
            parent: parent._id
        });

        let createdEnrollment = await enrollment.save();

        const response = {
            newToken,
            content: {
                Id: createdEnrollment._id,
                HighSchool: createdEnrollment.highSchool,
                SchoolClassification: createdEnrollment.schoolClassification,
                SchoolLocation: createdEnrollment.schoolLocation,
                PreferredStrand: createdEnrollment.preferredStrand,
                Student: {
                    Id: createdStudent._id,
                    FirstName: createdStudent.firstName,
                    LastName: createdStudent.lastName,
                    Age: createdStudent.age,
                    Gender: createdStudent.gender,
                    MobileNo: createdStudent.mobileNo
                },
                Parent: {
                    Id: createdParent._id,
                    FirstName: createdParent.firstName,
                    LastName: createdParent.lastName,
                    MobileNo: createdParent.mobileNo
                },
                CreatedAt: createdEnrollment.createdAt,
                UpdatedAt: createdEnrollment.updatedAt
            },
            message: 'Item successfully created.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        let { newToken } = req;

        let { enrollmentId } = req.params;

        let deletedEnrollment = await Enrollment.findOneAndRemove({ _id: enrollmentId });

        res.status(200).json({ newToken, message: 'Item successfully deleted.' });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};