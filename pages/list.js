import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Box, Button, Container, OutlinedInput, Paper, TextField } from '@mui/material';
import { BsImage } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineUpload } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { listCar } from '../actions/list.action';
import { checkSignin } from '../actions/auth.action';
import { useRouter } from 'next/router';
import { getTimeline } from '../actions/timeline.action';
import Reqsignin from '../components/Reqsignin';
import Image from 'next/image';

export default function List() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();

  const [front, setFront] = useState([]);
  const [back, setBack] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [interior, setInterior] = useState([]);
  const [carCompany, setCarCompany] = useState('');
  const [modelName, setModelName] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [kilometersDriven, setKilometersDriven] = useState('');
  const [condition, setCondition] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [step, setStep] = useState(0);

  const [file, setFile] = useState([]);
  useEffect(() => {
    dispatch(checkSignin());
    if (!auth.authenticate) {
      setStep(0);
    } else {
      setStep(1);
    }
  }, [auth.authenticate]);

  const date = new Date();
  date.setDate(date.getDate() + 7);

  const submitForm = () => {
    const form = new FormData();
    form.append('carCompany', carCompany);
    form.append('modelName', modelName);
    form.append('modelYear', modelYear);
    form.append('description', description);
    form.append('color', color);
    form.append('kilometersDriven', kilometersDriven);
    form.append('condition', condition);
    form.append('basePrice', basePrice);
    form.append('fullPrice', fullPrice);
    form.append('endTime', date);
    for (let pic of file) {
      form.append('image', pic);
    }

    dispatch(listCar(form,auth.accessToken,userinfo));
    router.push('/auctions');
  };

  useEffect(() => {
    setFile([...front, ...back, ...left, ...right, ...interior]);
    // console.log(file);
  }, [front, back, left, right, interior, step]);

  const desc =
    "The 2022 Ford Bronco Everglades build off the Bronco Black Diamond w model with additional features like a standard Bronco-first, factory-installed Ford Performance by WARN@ winch kit and air-intake snorkel. Combined with a 2.3L EcoBooste engine and the Sasquatch TM Package — it's built to help you confidently splash through water and take on dusty trails.";

  const reduce = (string) => {
    return string.split('').splice(0, 25).join('') + '...';
  };

  const toIndianCurrency = (num) => {
    const curr = num?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return curr;
  };

  const nextStepHandler = (currArray,nextStep,name) => {
    if (currArray.length) {
      setStep(nextStep);
    } else {
      toast(`Please upload ${name} profile photographs of your car`, { type: 'warning' });
    }
  };

  const renderStepOne = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={halfSizedInput}>
              <TextField
                sx={textFieldHalf}
                id="outlined-basic"
                label="Company"
                variant="outlined"
                value={carCompany}
                onChange={(e) => setCarCompany(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Model Name"
                variant="outlined"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </Box>
            <TextField
              sx={textField}
              id="outlined-basic"
              label="Color"
              variant="outlined"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Box sx={halfSizedInput}>
              <TextField
                sx={textFieldHalf}
                id="outlined-basic"
                label="Model Year"
                variant="outlined"
                type="number"
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Kilometers Driven"
                variant="outlined"
                type="number"
                value={kilometersDriven}
                onChange={(e) => setKilometersDriven(e.target.value)}
              />
            </Box>

            <Box sx={halfSizedInput}>
              <TextField
                sx={textFieldHalf}
                id="outlined-basic"
                label="Base Price"
                variant="outlined"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Sticker Price"
                variant="outlined"
                type="number"
                value={fullPrice}
                onChange={(e) => setFullPrice(e.target.value)}
              />
            </Box>
            <TextField
              sx={textField}
              // fullWidth
              id="outlined-basic"
              label="Describe your car briefly"
              variant="outlined"
              value={description}
              multiline
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              sx={textField}
              // fullWidth
              id="outlined-basic"
              label="Describe your car's condition"
              variant="outlined"
              value={condition}
              multiline
              rows={2}
              onChange={(e) => setCondition(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '50%', mx: 'auto', my: '15px' }}
              onClick={(e) => {
                if (
                  carCompany &&
                  modelName &&
                  color &&
                  modelYear &&
                  kilometersDriven &&
                  basePrice &&
                  fullPrice &&
                  description &&
                  condition
                ) {
                  setStep(2);
                } else {
                  toast('Please fill all the fields!', { type: 'warning' });
                }
              }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Box>
    );
  };
  const renderStepTwo = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload front profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setFront([...front, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {front.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>

                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setFront((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(1)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => nextStepHandler(front,3,'Front')} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };
  const renderStepThree = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload rear profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setBack([...back, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {back.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setBack((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(2)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => nextStepHandler(back,4,'Rear')} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepFour = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload right profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setRight([...right, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {right.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setRight((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(3)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => nextStepHandler(right,5,'Right')} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepFive = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload left profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setLeft([...left, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {left.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setLeft((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(4)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => nextStepHandler(left,6,'Left')} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepSix = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload interior profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setInterior([...interior, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {interior.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setInterior((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="outlined" color="secondary" onClick={() => setStep(5)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => nextStepHandler(interior,7,'Interior')} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepSeven = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
          width: {
            xs: '90vw',
            sm: '90vw',
            md: '40vw',
          },
        }}
      >
        <Box sx={{ fontSize: '20px', mb: '10px' }}>Please confirm car details</Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Company</Box>
          <Box sx={{ color: 'text.primary' }}>{carCompany} </Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Model Name</Box>
          <Box sx={{ color: 'text.primary' }}>{modelName} </Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Model Year</Box>
          <Box sx={{ color: 'text.primary' }}>{modelYear} </Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Color</Box>
          <Box sx={{ color: 'text.primary' }}>{color}</Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Kilometers Driven</Box>
          <Box sx={{ color: 'text.primary' }}>{kilometersDriven} Km</Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Base Price</Box>
          <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(basePrice)} </Box>
        </Box>
        <Box sx={carAttributes}>
          <Box sx={{ color: 'text.secondary' }}>Sticker Price</Box>
          <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(fullPrice)} </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
          <Box
            sx={{
              color: 'text.primary',
              my: '20px',
            }}
          >
            <Box sx={{ fontSize: '18px', color: 'text.secondary', mb: '10px' }}>Description</Box>
            {description}
          </Box>
          <Box
            sx={{
              color: 'text.primary',
              my: '20px',
            }}
          >
            <Box sx={{ fontSize: '18px', color: 'text.secondary', mb: '10px' }}>Condition</Box>
            {condition}
          </Box>
          <Box sx={{ fontSize: '20px', my: '10px', color: 'text.secondary' }}>Pictures</Box>
          <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {file.map((e, i) => (
              <Box key={i} sx={imageNamePreviewAll}>
              <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      src={URL.createObjectURL(e)}
                      alt={e.name}
                    />
                    <Paper
                      sx={imageName}
                      elevation={0}
                      variant="outlined"
                    >
                      {reduce(e.name)}
                    </Paper>
                  </Box>
                <AiOutlineCloseCircle
                  size="2em"
                  color="tomato"
                  onClick={(event) => {
                    event.preventDefault();
                    setFile((prev) => {
                      return prev.filter((item) => item != e);
                    });
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={() => setStep(6)} sx={{ width: '45%', my: '5px' }}>
            Back
          </Button>
          <Paper variant="outlined" sx={{ width: '45%', px: '5px' }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%', my: '5px' }}
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              List the Car
            </Button>
          </Paper>
        </Box>
      </Box>
    );
  };

  switch (step) {
    case 0:
      return <Reqsignin />;
    case 1:
      return renderStepOne();
    case 2:
      return renderStepTwo();
    case 3:
      return renderStepThree();
    case 4:
      return renderStepFour();
    case 5:
      return renderStepFive();
    case 6:
      return renderStepSix();
    case 7:
      return renderStepSeven();
  }
}

const stepOneFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: {
    xs: '100vw',
    sm: '50vw',
    md: '40vw',
  },
};

const stepOneWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const textField = {
  width: '100%',
  my: '10px',
};

const textFieldHalf = { width: '100%', mt: '10px', mr: '20px' };

const halfSizedInput = {
  display: 'flex',
};

const uploadText = {
  position: 'absolute',
  top: { xs: '35%', sm: '35%', md: '40%' },
  left: { xs: '25%', sm: '35%', md: '30%' },
  textAlign: 'center',
};

const stepHeading = { mx: 'auto', fontSize: '20px', mb: '30px' };

const imageNamePreview = {
  display: 'flex',
  width: '45%',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid gray',
  borderRadius: '10px',
  p: '5px',
  my: '10px',
};

const imageNamePreviewAll = {
  display: 'flex',
  width: '45%',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid gray',
  borderRadius: '10px',
  p: '5px',
  my: '10px',
};

const imageNamePreviewWrap = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap:'wrap',
  my: '10px',
  flexDirection: 'row',
  alignItems: 'center',
};

const nextButton = { width: '40%', my: '10px' };

const OutlinedInputStyle = { display: 'flex', height: '40vh' };

const carAttributes = {
  display: 'flex',
  width: '100&',
  justifyContent: 'space-between',
  fontSize: '17px',
  mt: '10px',
};

const imageName = {
  fontSize:'0.7em',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  height: '15px',
  position: 'absolute',
  bottom: '0px',
  left: '0px',
  padding: '10px',
  borderRadius: '0px 10px 0px 10px',
  color: 'custom',
}
