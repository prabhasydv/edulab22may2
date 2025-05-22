import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    overview: "", // <-- New field
    category: "",
    courseLevel: "",
    courseThumbnail: "",
    // pricingOptions: [{ optionName: "", price: "" }],
    pricingOptions: [
      {
        optionName: "",
        price: "",
        batches: [
          { batchName: "", startDate: "", endDate: "", capacity: "" }
        ],
      }
    ],
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();
  const navigate = useNavigate();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        overview: course.overview || "", // <-- Set from course data
        category: course.category,
        courseLevel: course.courseLevel,
        courseThumbnail: "",
        // pricingOptions: course.pricingOptions || [{ optionName: "", price: "" }],
        pricingOptions: course.pricingOptions.length
          ? course.pricingOptions.map(opt => ({
            ...opt,
            batches: opt.batches?.length
              ? opt.batches
              : [{ batchName: "", startDate: "", endDate: "", capacity: "" }],
          }))
          : [{ optionName: "", price: "", batches: [{ batchName: "", startDate: "", endDate: "", capacity: "" }] }],
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // const handlePriceChange = (index, field, value) => {
  //   const updatedPrices = [...input.pricingOptions];
  //   updatedPrices[index][field] = value;
  //   setInput({ ...input, pricingOptions: updatedPrices });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const addPriceOption = () => {
  //   setInput({
  //     ...input,
  //     pricingOptions: [...input.pricingOptions, { optionName: "", price: "" }],
  //   });
  // };

  // const removePriceOption = (index) => {
  //   const updatedPrices = input.pricingOptions.filter((_, i) => i !== index);
  //   setInput({ ...input, pricingOptions: updatedPrices });
  // };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("courseOverview", input.overview); // ✅ Add this here
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("courseThumbnail", input.courseThumbnail);
    formData.append("pricingOptions", JSON.stringify(input.pricingOptions));


    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...input.pricingOptions];
    updatedPrices[index][field] = value;
    setInput(prev => ({ ...prev, pricingOptions: updatedPrices }));
  };

  const handleBatchChange = (priceIndex, batchIndex, field, value) => {
    const updatedPrices = [...input.pricingOptions];
    updatedPrices[priceIndex].batches[batchIndex][field] = value;
    setInput(prev => ({ ...prev, pricingOptions: updatedPrices }));
  };

  const addBatch = (priceIndex) => {
    const updatedPrices = [...input.pricingOptions];
    updatedPrices[priceIndex].batches.push({ batchName: "", startDate: "", endDate: "", capacity: "" });
    setInput(prev => ({ ...prev, pricingOptions: updatedPrices }));
  };

  const removeBatch = (priceIndex, batchIndex) => {
    const updatedPrices = [...input.pricingOptions];
    updatedPrices[priceIndex].batches = updatedPrices[priceIndex].batches.filter((_, i) => i !== batchIndex);
    setInput(prev => ({ ...prev, pricingOptions: updatedPrices }));
  };

  const addPriceOption = () => {
    setInput(prev => ({
      ...prev,
      pricingOptions: [...prev.pricingOptions, { optionName: "", price: "", batches: [{ batchName: "", startDate: "", endDate: "", capacity: "" }] }],
    }));
  };

  const removePriceOption = (index) => {
    const updatedPrices = input.pricingOptions.filter((_, i) => i !== index);
    setInput(prev => ({ ...prev, pricingOptions: updatedPrices }));
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div>
            <Label>Overview</Label>
            <textarea
              name="overview"
              value={input.overview}
              onChange={changeEventHandler}
              className="w-full p-2 border rounded-md min-h-[120px]"
              placeholder="Write a short overview of the course..."
            />
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <Label>Category</Label>
              <Select defaultValue={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Agile Management">Agile Management</SelectItem>
                    <SelectItem value="Project Management">Project Management</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="BI And Visualization">BI And Visualization</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Software Testing">Software Testing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} className="w-64 my-2" alt="Course Thumbnail" />
            )}
          </div>

          {/* Price Options Section */}
          {/* <div>
            <Label>Price Options (USD)</Label>
            {input.pricingOptions.map((option, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Option Name (e.g. Basic, Premium)"
                  value={option.optionName}
                  onChange={(e) => handlePriceChange(index, "optionName", e.target.value)}
                  className="w-[180px]"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={option.price}
                  onChange={(e) => handlePriceChange(index, "price", e.target.value)}
                  className="w-[120px]"
                />
                {input.pricingOptions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removePriceOption(index)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPriceOption}
              className="mt-1"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Option
            </Button>
          </div> */}
          <div>
            <Label>Price Options (USD)</Label>
            {input.pricingOptions.map((option, priceIndex) => (
              <div key={priceIndex} className="mb-6 border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    placeholder="Option Name (e.g. Basic, Premium)"
                    value={option.optionName}
                    onChange={(e) => handlePriceChange(priceIndex, "optionName", e.target.value)}
                    className="w-[180px]"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={option.price}
                    onChange={(e) => handlePriceChange(priceIndex, "price", e.target.value)}
                    className="w-[120px]"
                  />
                  {input.pricingOptions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removePriceOption(priceIndex)}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  )}
                </div>

                {/* Batches for this pricing option */}
                <div className="ml-4">
                  <Label>Batches</Label>
                  {option.batches.map((batch, batchIndex) => (
                    <div key={batchIndex} className="flex gap-2 items-center mb-2 flex-wrap">
                      <Input
                        placeholder="Batch Name"
                        value={batch.batchName}
                        onChange={(e) => handleBatchChange(priceIndex, batchIndex, "batchName", e.target.value)}
                        className="w-[180px]"
                      />
                      <Input
                        type="text"
                        placeholder="Start Date (e.g., 28 May)"
                        value={batch.startDate}
                        onChange={(e) => handleBatchChange(priceIndex, batchIndex, "startDate", e.target.value)}
                        className="w-[140px]"
                      />

                      <Input
                        type="text"
                        placeholder="End Date (e.g., 28 May)"
                        value={batch.endDate}
                        onChange={(e) => handleBatchChange(priceIndex, batchIndex, "endDate", e.target.value)}
                        className="w-[140px]"
                      />
                      <Input
                        type="number"
                        min="0"
                        placeholder="Capacity"
                        value={batch.capacity}
                        onChange={(e) => handleBatchChange(priceIndex, batchIndex, "capacity", e.target.value)}
                        className="w-[100px]"
                      />
                      {option.batches.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeBatch(priceIndex, batchIndex)}
                        >
                          <Trash2 className="text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBatch(priceIndex)}
                    className="mt-1"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Batch
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPriceOption}
              className="mt-1"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Price Option
            </Button>
          </div>


          <div className="flex gap-2 mt-6">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
