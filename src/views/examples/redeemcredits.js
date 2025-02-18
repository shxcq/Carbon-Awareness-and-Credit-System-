import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Alert,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid"; // For generating unique codes

const RedeemCredits = () => {
  const [credits, setCredits] = useState(100); // Example credit balance
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRedeem = () => {
    if (credits >= 50) { // Set a threshold for redemption
      const generatedCode = "ECO-" + uuidv4().slice(0, 8).toUpperCase();
      setCode(generatedCode);
      setCredits(credits - 50);
      setMessage("Redemption successful! Use this code at a participating store.");
      setIsSuccess(true);
    } else {
      setMessage("You need at least 50 credits to redeem.");
      setIsSuccess(false);
    }
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col xl="8" className="offset-xl-2">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0 text-center">
              <h3 className="mb-0">Redeem Your Carbon Credits</h3>
            </CardHeader>
            <CardBody>
              {message && <Alert color={isSuccess ? "success" : "danger"}>{message}</Alert>}
              <h4 className="text-center">Available Credits: {credits}</h4>
              <div className="text-center mt-3">
                <Button color="primary" onClick={handleRedeem} disabled={credits < 50}>
                  Redeem 50 Credits
                </Button>
              </div>
              {code && (
                <div className="text-center mt-4">
                  <h5>Your Redemption Code:</h5>
                  <Input className="text-center font-weight-bold" value={code} readOnly />
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RedeemCredits;
