import java.util.Base64;

import javax.crypto.Cipher;
import java.io.ByteArrayOutputStream;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

public class Javascrypto {

    private static final String KEY_ALGORITHM = "RSA";
    private static final Integer KEY_SIZE = 2048;

    private static final int MAX_ENCRYPT_BLOCK = 117;

    private static final int MAX_DECRYPT_BLOCK = KEY_SIZE / 8;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        if (args.length != 2) {
            throw new IllegalArgumentException("Invalid number of arguments");
        }
        if (args[0].equals("--enc") && args[0].equals("--dec")) {
            throw new IllegalArgumentException("Invalid number of argument: first arg shoud be either --enc or --dec");
        }
        String type = args[0];
        String data = args[1];
        if (type.equals("--enc")) {
            byte[] ussd = encryptByPublicKey(
                    data.getBytes(),
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgIwN9mVEWG9kagbxt2ippr8RNzK/fhBXcZa1ViQRnClz3VTjk9cnomIds3AFhsiNihNTPVSirbeCOKxr99mvJuuGdarzfkNEIbOkSLFfO7P6HdQHQjaTg9LueWUy1tz1gh0dsNpg4zPVr+T9lTCTWOnDgU2hNixo0r9wo72dxwXTc55vX4X7sWSz29WzrlKyyBQ2+CcA55EYp6cWwpkaTSfV+Boymr/ZnLI7qlp/7FGZk2574fvE/9uCZdnAHYCTzKOFUjEwZ9o8sw/f+TVglbKvRDSMpqsZXN6DY7FvXMp52ACM7OAp63y8Hir2YKAWj6OJ8KVoS8TAUeDmHyaWwwIDAQAB");
            System.out.println(Base64.getEncoder().encodeToString(ussd));
        } else {

        }

    }

    public static byte[] encryptByPublicKey(byte[] data, String publicKey) {
        try {
            System.out.println("data byte");
            System.out.println(data);
            byte[] keyBytes = Base64.getDecoder().decode(publicKey);
            System.out.println("publicKey");
            System.out.println(publicKey);
            System.out.println("publicKeybyte");
            System.out.println(keyBytes);
            X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
            Key publicK = keyFactory.generatePublic(x509KeySpec);
            Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
            cipher.init(Cipher.ENCRYPT_MODE, publicK);
            int inputLen = data.length;
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            int offSet = 0;
            byte[] cache;
            int i = 0;
            while (inputLen - offSet > 0) {
                if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
                    cache = cipher.doFinal(data, offSet, MAX_ENCRYPT_BLOCK);
                } else {
                    cache = cipher.doFinal(data, offSet, inputLen - offSet);
                }
                out.write(cache, 0, cache.length);
                i++;
                offSet = i * MAX_ENCRYPT_BLOCK;
            }
            byte[] encryptedData = out.toByteArray();
            out.close();
            System.out.println("encryptedData byte");
            System.out.println(encryptedData);
            return encryptedData;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
