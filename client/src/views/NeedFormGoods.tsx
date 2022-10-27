import * as React from 'react';
import { Grid, Button, Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { FileUploadInput, RadioGroup, Select, TextField } from '../components/Forms';
import NeedOfferForm from './NeedOfferForm';
import DetectFormData from '../components/DetectFormData';
import AlertDialog from '../components/AlertDialog';
import { UserContext } from '../providers';

import type { Category, Option } from '../types';
import { APP_API_BASE_URL } from '../configs';

const fetchCategories = async (): Promise<Option[]> => {
  const res = await fetch(`${APP_API_BASE_URL}/categories?applies_to_assets=true`);
  const data = await res.json();

  const categories = data.map((category: Category) => {
    const value = category.name.toLowerCase();
    const text = category.name;

    return { id: category.id, text, value };
  });

  return categories;
};

const conditions = [
  { value: 'like-new', text: 'Like new' },
  { value: 'excellent', text: 'Excellent' },
  { value: 'good', text: 'Good' },
];
const needTypes = [
  { value: 'donation', text: 'Donation' },
  { value: 'short-term', text: 'Short term loan (<1 month)' },
  { value: 'long-term', text: 'Long term loan (>1 month)' },
];
const deliveryTypes = [
  { value: 'pick-up', text: 'Pick up only' },
  { value: 'drop-off', text: 'Drop off only' },
  { value: 'pick-up-drop-off', text: 'Pick up and drop off' },
];

interface ShareANeedData {
  title: string;
  location: string;
  description: string;
  category: string;
  condition: string;
  quantity: string;
  needType: string;
  deliveryMethod: string;
  imgUrls: string[];
}

const initialFormData: ShareANeedData = {
  title: '',
  location: '',
  description: '',
  category: '',
  condition: '',
  quantity: '',
  needType: '',
  deliveryMethod: '',
  imgUrls: [''],
};

function NeedForm(): JSX.Element {
  const [formData, setFormData] = React.useState<ShareANeedData>(initialFormData);
  const [formInProgress, setFormInProgress] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [user] = React.useContext(UserContext);
  const [validUrl, setValidUrl] = React.useState<boolean>(true);
  const [imgArrLength, setImgArrLength] = React.useState<boolean>(true);
  const [imgUnique, setImgUnique] = React.useState<boolean>(true);

  const history = useHistory();

  React.useEffect(() => {
    setFormInProgress(() => DetectFormData(formData));
  }, [formData]);

  React.useEffect(() => {
    (async function () {
      const categories = await fetchCategories();
      setCategories(categories);
    })();
  }, []);

  const isValidUrl = (urlString: string) => {
    let urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return !!urlPattern.test(urlString);
  };

  function addPhotoUrl() {
    let photoUrl: string = formData.imgUrls[formData.imgUrls.length - 1];
    if (isValidUrl(photoUrl) && formData.imgUrls.length < 10 && imgUnique) {
      setFormData({ ...formData, imgUrls: [...formData.imgUrls, ''] });
      setValidUrl(true);
      setImgUnique(true);
    } else if (formData.imgUrls.length >= 10) {
      setImgArrLength(false);
    } else if (!imgUnique) {
      setImgUnique(false);
    } else {
      setValidUrl(false);
    }
  }

  const imageInputFields = formData.imgUrls.map((img, i) => {
    return (
      <TextField
        key={i}
        id={'imgUrls' + i}
        label={`Photo ${i + 1}`}
        placeholder="Insert photo url"
        value={formData.imgUrls[i]}
        onChange={(e) => handleChangePhotoURL(e, i)}
      />
    );
  });

  // HTMLInputElement does not work for the MUISelect - This works, but can we find a better way of doing it?
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
    let { name = '', value }: { name?: string | undefined; value: unknown } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleChangePhotoURL = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setFormData((fData) => {
      if (formData.imgUrls.includes(event.target.value)) {
        setImgUnique(false);
      } else {
        setImgUnique(true);
      }
      let newImageUrls = [...fData.imgUrls];
      newImageUrls[index] = event.target.value;
      return {
        ...fData,
        imgUrls: newImageUrls,
      };
    });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!isValidUrl(formData.imgUrls[formData.imgUrls.length - 1])) {
      formData.imgUrls.pop();
      console.log('REMOVED');
    }
    const res = await fetch(`${APP_API_BASE_URL}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        poster: user,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      history.push('/asset/' + data.id);
    } else {
      // TODO: Display error modal
      console.error(data.message);
    }
  };

  return (
    <NeedOfferForm title="Share a Need: Goods">
      <AlertDialog when={formInProgress} onConfirmation={() => true} onCancel={() => false} />
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <TextField
            id="title"
            label="Title"
            placeholder="What goods do you need?"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="location"
            label="Location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            id="description"
            label="Description"
            placeholder="Describe what goods you are looking for"
            value={formData.description}
            onChange={handleChange}
            isMultiline={true}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="category"
            label="Category"
            placeholder="Select a category"
            options={categories}
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Select
            id="condition"
            label="Condition"
            placeholder="Select a preferred condition"
            options={conditions}
            value={formData.condition}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="quantity"
            label="Quantity"
            placeholder="# of goods needed"
            value={formData.quantity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <RadioGroup
            label="Need Type"
            id="needType"
            options={needTypes}
            value={formData.needType}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <RadioGroup
            label="Delivery Method"
            id="deliveryMethod"
            options={deliveryTypes}
            value={formData.deliveryMethod}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUploadInput
            label="Photos"
            id="photos"
            text="Click here to upload photos"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Or link photos below</p>
          {imageInputFields}
          {validUrl ? null : <Alert severity="info">Please add a valid URL</Alert>}
          {imgArrLength ? null : <Alert severity="info">Limit to 10 photos</Alert>}
          {imgUnique ? null : <Alert severity="info">No duplicate images</Alert>}
          <Button onClick={addPhotoUrl}>click here to add another photo</Button>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="secondary">
              Save Draft
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Need
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </NeedOfferForm>
  );
}

export default NeedForm;
