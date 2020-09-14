package com.bksoftwarevn.dongydomuoi;

import com.bksoftwarevn.dongydomuoi.service_impl.RestService;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

@SpringBootApplication
public class DongYDoMuoi implements CommandLineRunner {

    @Autowired
    private RestService restService;

    public static void main(String[] args) {
        SpringApplication.run(DongYDoMuoi.class, args);
    }

    @Bean
    public RestTemplate restTemplate() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
                .loadTrustMaterial(null, acceptingTrustStrategy)
                .build();

        SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);

        CloseableHttpClient httpClient = HttpClients.custom()
                .setSSLSocketFactory(csf)
                .build();

        HttpComponentsClientHttpRequestFactory requestFactory =
                new HttpComponentsClientHttpRequestFactory();

        requestFactory.setHttpClient(httpClient);
        return new RestTemplate(requestFactory);
    }

    @Override
    public void run(String... args) throws Exception {
//        TimerTask timerTask = new TimerTask() {
//            @Override
//            public void run() {
//                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z");
//                System.out.println("----Write SiteMap XML: "+formatter.format(new Date()));
//                try {
//                    Object o = restService.callPut(RestBuilder.build()
//                            .service("infor-system-service")
//                            .uri("api/v1/private/site-map/2"));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        };
//        Timer timer = new Timer();
//        timer.schedule(timerTask, 0,24*60*60*1000);
    }
}