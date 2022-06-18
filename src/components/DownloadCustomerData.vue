<template>
  <div class="download-csv-report">
    <h6 class="customer-title header-letterspace">Download Customer Data</h6>
    <p>
      This data consists of a list of customers who have purchased your
      blooprint. Click on the Download button below to download the CSV file.
    </p>
    <q-btn
      no-caps
      flat
      type="submit"
      label="Download"
      class="
            bg-primary
            download-button
            q-mt-lg
            inline-block
            cursor-pointer
        "
      @click="downloadData"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DownloadCustomerData',
  methods: {
    downloadData() {
      axios({
        url: `${process.env.BLOOPRINTED_ENV_API_URL}/v1/reports`,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(response => {
        axios({
          url: response.data.data.attributes.message,
          method: 'GET'
        }).then(res => {
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], { type: 'csv' })
          )
          var fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', `blooprints purchased reports.csv`)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
      })
    }
  }
}
</script>

<style lang="scss">
.download-csv-report .customer-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #152141;
  margin: 0;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    color: #000000 !important;
  }
}
.download-csv-report p {
  width: 100%;
  max-width: 625px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #152141;
  margin: 25px 0;
  display: block;
}
.download-button {
  color: #fff;
  border-radius: 10px;
  width: 143px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
</style>
