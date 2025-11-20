# homework 5

- [ ]  Check for code that has to be shared on the website
    - When deliverables include "Implement the iterative_denoise_cfg function," does that mean we should put the function onto our website?
    - Yeah, please show your code. A few most important lines would work.
- [ ]  How should we include the personal images to download for the submission? I used google colab, and so loaded the images from my google drive.
    - [ ]  You can just add the images to your submission .zip and include some instructions/a README.md describing how to load them into Drive.

# Part A

## Part:0

- Come up with some interesting text prompts and generate their embeddings.

You have the embeddings for the following prompts
['an oil painting of a snowy mountain village',
'a photo of the amalfi coast',
'a photo of a man',
'a photo of a hipster barista',
'a photo of a dog',
'an oil painting of people around a campfire',
'an oil painting of an old man',
'a lithograph of waterfalls',
'a lithograph of a skull',
'a man wearing a hat',
'a high quality photo',
'a rocket ship',
'a pencil',
'a picture of a bear on the berkeley campus',
'snowy munich with nice lighting',
'a tiger on the streets of berlin',
'an oil painting of madonna',
'a christmas tree with blue lights',
'a rubber duck',
'a nuclear explosion',
'a chef cooking',
'a mad scientist',
'a yoga instructor',
'a pretzel',
'ruins of a building',
'a modern skyscraper',
'the sun',
'the moon',
'dinosaurs',
'robots',
'']

- Choose 3 of your prompts to generate images and display the caption and the output of the model. Reflect on the quality of the outputs and their relationships to the text prompts. Make sure to try at least 2 different `num_inference_steps` values.
- `num_inference_steps` = 10 / 20 / 40
    - a picture of a bear on the berkeley campus
        
        ![download.png](homework%205/download.png)
        
        ![download.png](homework%205/download%201.png)
        
        ![download.png](homework%205/download%202.png)
        
    - snowy munich with nice lighting
        
        ![download.png](homework%205/download%203.png)
        
        ![download.png](homework%205/download%204.png)
        
        ![download.png](homework%205/download%205.png)
        
    - a tiger on the streets of berlin
        
        ![download.png](homework%205/download%206.png)
        
        ![download.png](homework%205/download%207.png)
        
        ![download.png](homework%205/download%208.png)
        
    - an oil painting of madonna
        
        ![download.png](homework%205/download%209.png)
        
        ![download.png](homework%205/download%2010.png)
        
        ![download.png](homework%205/download%2011.png)
        
    - a christmas tree with blue lights
        
        ![download.png](homework%205/download%2012.png)
        
        ![download.png](homework%205/download%2013.png)
        
        ![download.png](homework%205/download%2014.png)
        
    
- Report the random seed that you're using here. You should use the same seed all subsequent parts.
    - 8

## **Part 1: Sampling Loops**

- Implement the `noisy_im = forward(im, t)` function

```jsx
def forward(im, t):
  """
  Args:
    im : torch tensor of size (1, 3, 64, 64) representing the clean image
    t : integer timestep

  Returns:
    im_noisy : torch tensor of size (1, 3, 64, 64) representing the noisy image at timestep t
  """
  with torch.no_grad():
    # ===== your code here! ====

    alpha_bar_t = alphas_cumprod[t]
    
    # Sample noise from standard normal distribution
    epsilon = torch.randn_like(im)
    
    # Apply the forward diffusion formula
    im_noisy = torch.sqrt(alpha_bar_t) * im + torch.sqrt(1 - alpha_bar_t) * epsilon

    # ===== end of code ====
  return im_noisy
```

- Show the Campanile at noise level [250, 500, 750].
    
    ![download.png](homework%205/download%2015.png)
    

## **1.2 Classical Denoising**

• For each of the 3 noisy Campanile images from the previous part, show your best Gaussian-denoised version side by side.

![download.png](homework%205/download%2016.png)

![download.png](homework%205/download%2017.png)

## **1.3 Implementing One Step Denoising**

### Deliverables

For the 3 noisy images from 1.2 (t = [250, 500, 750]):

- Use your `forward` function to add noise to your Campanilie
- Estimate the noise in the new noisy image, by passing it through `stage_1.unet`
- Remove the noise from the noisy image to obtain an estimate of the original image
- Visualize the original image, the noisy image, and the estimate of the original image
    
    ![download.png](homework%205/download%2018.png)
    
    ![download.png](homework%205/download%2019.png)
    
    ![download.png](homework%205/download%2020.png)
    

## **1.4 Implementing Iterative Denoising**

**Deliverables**

Using `i_start = 10`:

- Create `strided_timesteps`: a list of monotonically decreasing timesteps, starting at 990, with a stride of 30, eventually reaching 0. Also initialize the timesteps using the function `stage_1.scheduler.set_timesteps(timesteps=strided_timesteps)`
- Complete the `iterative_denoise` function
- Show the noisy Campanilie every 5th loop of denoising (it should gradually become less noisy)
    
    ![download.png](homework%205/download%2021.png)
    
- Show the final predicted clean image, using iterative denoising
- Show the predicted clean image using only a single denoising step, as was done in the previous part. This should look much worse.
- Show the predicted clean image using gaussian blurring, as was done in part 1.2.
    
    ![download.png](homework%205/download%2022.png)
    

## **1.5 Diffusion Model Sampling**

### Deliverables

- Show 5 sampled images
    
    ![download.png](homework%205/download%2023.png)
    

## **1.6 Classifier Free Guidance**

### Deliverables

- Implement the `iterative_denoise_cfg` function
- Show 5 images with a prompt `"a high quality photo"` with a CFG scale of . Now this prompt becomes a **condition** (but fairly weak) to generate **conditional** noise! You will use your customized prompts as stronger conditions in part 1.7 - part 1.9.
    
    𝛾=7
    
    ![download.png](homework%205/download%2024.png)
    

## **1.7 Image-to-image Translation**

**Deliverables**

- Edits of the Campanile image, using the given prompt at noise levels [1, 3, 5, 7, 10, 20] with the conditional text prompt `"a high quality photo"`
    
    ![download.png](homework%205/download%2025.png)
    
- Edits of 2 of your own test images, using the same procedure.
    
    ![download.png](homework%205/download%2026.png)
    
    ![download.png](homework%205/download%2027.png)
    

## **1.7.1 Editing Hand-Drawn and Web Images**

### Deliverables

- 1 image from the web of your choice, edited using the above method for noise levels [1, 3, 5, 7, 10, 20] (and whatever additional noise levels you want)
    
    ![download.png](homework%205/download%2028.png)
    

![download.png](homework%205/download%2029.png)

1

![download.png](homework%205/download%2030.png)

20

![download.png](homework%205/download%2031.png)

3

![download.png](homework%205/download%2032.png)

5

![download.png](homework%205/download%2033.png)

7

![download.png](homework%205/download%2034.png)

10

![Screenshot 2025-11-19 at 12.18.14 PM.png](homework%205/Screenshot_2025-11-19_at_12.18.14_PM.png)

- 2 hand drawn images, edited using the above method for noise levels [1, 3, 5, 7, 10, 20] (and whatever additional noise levels you want)
    
    ![download.png](homework%205/download%2035.png)
    

![download.png](homework%205/download%2036.png)

1

![download.png](homework%205/download%2037.png)

20

![download.png](homework%205/download%2038.png)

3

![download.png](homework%205/download%2039.png)

5

![download.png](homework%205/download%2040.png)

7

![download.png](homework%205/download%2041.png)

10

![download.png](homework%205/download%2042.png)

![download.png](homework%205/download%2043.png)

1

![download.png](homework%205/download%2044.png)

20

![download.png](homework%205/download%2045.png)

3

![download.png](homework%205/download%2046.png)

5

![download.png](homework%205/download%2047.png)

7

![download.png](homework%205/download%2048.png)

10

## **1.7.2 Inpainting**

### Deliverables

- A properly implemented `inpaint` function
- The Campanile inpainted (feel free to use your own mask)
    
    ![download.png](homework%205/download%2049.png)
    
    ![download.png](homework%205/download%2050.png)
    
- 2 of your own images edited (come up with your own mask)
    - look at the results from [this paper](https://www.google.com/url?q=http%3A%2F%2Fgraphics.cs.cmu.edu%2Fprojects%2Fscene-completion%2F) for inspiration
        
        ![download.png](homework%205/download%2051.png)
        
        ![download.png](homework%205/download%2052.png)
        

## **1.7.3 Text-Conditioned Image-to-image Translation**

### Deliverables

- Edits of the Campanile, using the given prompt at noise levels [1, 3, 5, 7, 10, 20]

<aside>

`a christmas tree with blue lights`

![download.png](homework%205/download%2053.png)

</aside>

- Edits of 2 of your own test images, using the same procedure.

an oil painting of madonna

![download.png](homework%205/download%2054.png)

snowy munich with nice lighting

![download.png](homework%205/download%2055.png)

## **1.8 Visual Anagrams**

**Deliverables**

- Correctly implemented `visual_anagrams` function
- 2 illusions of your choice that change appearance when you flip it upside down (feel free to take inspirations from this [page](https://dangeng.github.io/visual_anagrams/)).
    
    ![download.png](homework%205/download%2056.png)
    
    ![download.png](homework%205/download%2057.png)
    
    ![download.png](homework%205/download%2058.png)
    

## **1.9 Hybrid Images**

### Deliverables

- Correctly implemented `make_hybrids` function
- 2 hybrid images of your choice
    
    ![download.png](homework%205/download%2059.png)
    

![download.png](homework%205/download%2060.png)